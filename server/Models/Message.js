import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversation: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Conversation",
    required: true,
    index: true
  },
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "UserModel",
    required: true,
    index: true 
  },
  content: {
    text: { 
      type: String,
      trim: true,
      required: function() {
        return !this.content.file; // Text is required if no file
      }
    },
    file: {
      url: { type: String },
      name: { type: String },
      type: {
        type: String,
        enum: ["image", "video", "document", "other"],
        default: "other"
      },
      size: { type: Number } // in bytes
    }
  },
  readBy: [{
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "UserModel" 
    },
    readAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent"
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for faster message retrieval in a conversation
messageSchema.index({ conversation: 1, createdAt: -1 });

// Virtual for checking if message is from advisor
messageSchema.virtual('isFromAdvisor').get(function() {
  return this.sender?.roles === "Advisor";
});

const Message = mongoose.model("Message", messageSchema);
export default Message;