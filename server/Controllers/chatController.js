import Message from "../Models/Message.js";
import Conversation from "../Models/Conversation.js";
import mongoose from "mongoose";

// @desc    Create or get existing conversation between user and advisor
// @route   POST /api/conversations
// @access  Private
import AdvisorAssignment from '../Models/AdvisorAssignment.js';
import Application from "../Models/Application.js";


export const createConversation = async (req, res) => {
  const { userId, advisorId } = req.body;
  console.log("userId:", userId);
  console.log("advisorId:", advisorId);

  try {
    // Step 1: Check for advisor assignment
    const assignment = await AdvisorAssignment.findOne({
      studentId: new mongoose.Types.ObjectId(userId),
      AdvisorId: new mongoose.Types.ObjectId(advisorId)
    });
    console.log(assignment)

    if (!assignment) {
      return res.status(404).json({ error: "Advisor assignment not found for given user and advisor." });
    }

    // Step 2: Get internshipId from approved application
    const application = await Application.findOne({
      applicantId: new mongoose.Types.ObjectId(userId),
      status: "approved"
    });
    console.log("application..:", application)
    
    if (!application) {
      return res.status(404).json({ error: "Approved internship application not found for user." });
    }
    
    const internshipId = application._id; // ✅ Use application _id as internship reference
    

    // Step 3: Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, advisorId] }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [userId, advisorId],
        internship: internshipId
      });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error("Create conversation error:", error);
    res.status(500).json({
      error: error.message,
      details: "Failed to create conversation. Please verify user, advisor, and application."
    });
  }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
  const { conversationId, senderId, text } = req.body;
  const file = req.file;

  // Validate conversation exists and sender is a participant
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    return res.status(404).json({ error: "Conversation not found" });
  }

  if (!conversation.participants.includes(senderId)) {
    return res.status(403).json({ error: "You are not a participant in this conversation" });
  }

  try {
    const messageData = {
      conversation: conversationId,
      sender: senderId,
      content: {
        text: text || undefined
      },
      status: "sent"
    };

    if (file) {
      messageData.content.file = {
        url: `/uploads/chat/${file.filename}`,
        name: file.originalname,
        type: normalizeFileType(file.mimetype),
        size: file.size
      };
    }

    const message = new Message(messageData);
    await message.save();

    // Update conversation last message and unread count
    const receiverId = conversation.participants.find(id => !id.equals(senderId));
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message._id,
      $inc: { [`unreadCount.${receiverId}`]: 1 }
    });

    // Populate sender details for real-time updates
    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'userName email profile roles');

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: "Failed to send message"
    });
  }
};

// Helper function to normalize file types
function normalizeFileType(mimetype) {
  if (mimetype.startsWith("image")) return "image";
  if (mimetype.startsWith("video")) return "video";
  if (mimetype === "application/pdf") return "document";
  if (mimetype.includes("msword") || mimetype.includes("document"))
    return "document";
  return "other";
}

// @desc    Get messages for a conversation
// @route   GET /api/conversations/:conversationId/messages
// @access  Private
export const getMessages = async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user._id; // Assuming user is authenticated
  console.log("conversationId:", conversationId);
  console.log("userId:", userId);

  try {
    // Fetch conversation by ID
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    console.log("Conversation:", conversation);
    console.log("Conversation participants:", conversation.participants);

    // Verify user is part of the conversation by matching the userId
    // Check if userId is in the participants array and ensure proper comparison
    const isUserInConversation = conversation.participants.some(participant =>
      participant.toString() === userId.toString()
    );

    if (!isUserInConversation) {
      return res.status(403).json({ error: "Access denied" });
    }

    const messages = await Message.find({ conversation: conversationId })
      .sort({ createdAt: 1 })
      .populate('sender', 'userName profile roles');

    // Mark messages as read if viewing
    await Message.updateMany(
      { 
        conversation: conversationId,
        sender: { $ne: userId },
        "readBy.userId": { $ne: userId }
      },
      { 
        $push: { readBy: { userId } },
        $set: { status: "read" }
      }
    );

    // Reset unread count for this user
    await Conversation.findByIdAndUpdate(conversationId, {
      $set: { [`unreadCount.${userId}`]: 0 }
    });

    res.status(200).json(messages);

  } catch (error) {
    console.error('Error in getMessages:', error);
    res.status(500).json({ 
      error: error.message,
      details: "Failed to fetch messages"
    });
  }
};


// @desc    Get all conversations for a user
// @route   GET /api/conversations
// @access  Private
export const getConversations = async (req, res) => {
  const userId = req.user._id; // From authentication middleware

  try {
    const conversations = await Conversation.find({
      participants: userId
    })
    .populate({
      path: 'participants',
      select: 'userName email profile roles'
    })
    .populate({
      path: 'lastMessage',
      select: 'content createdAt'
    })
    .sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: "Failed to fetch conversations"
    });
  }
};




// @desc    Update message (only text)
// @route   PUT /api/messages/:messageId
// @access  Private
export const updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;

  const message = await Message.findById(messageId);
  if (!message) {
    return res.status(404).json({ error: "Message not found" });
  }

  // Only sender can update their message
  if (!message.sender.equals(userId)) {
    return res.status(403).json({ error: "Not authorized to edit this message" });
  }

  try {
    message.content.text = text;
    const updatedMessage = await message.save();
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: "Failed to update message"
    });
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:messageId
// @access  Private
export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user._id;

  const message = await Message.findById(messageId);
  if (!message) {
    return res.status(404).json({ error: "Message not found" });
  }

  // Only sender can delete their message
  if (!message.sender.equals(userId)) {
    return res.status(403).json({ error: "Not authorized to delete this message" });
  }

  try {
    await message.remove();
    
    // Update conversation's last message if needed
    const conversation = await Conversation.findOne({ lastMessage: messageId });
    if (conversation) {
      const newLastMessage = await Message.findOne({ conversation: conversation._id })
        .sort({ createdAt: -1 });
      
      conversation.lastMessage = newLastMessage?._id || null;
      await conversation.save();
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      details: "Failed to delete message"
    });
  }
};