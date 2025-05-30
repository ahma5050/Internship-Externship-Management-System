import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true
  }],
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship",
    required: false // Optional for general advice conversations
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  },
  unreadCount: {
    type: Map,
    of: Number,
    default: {}
  },
  archivedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel"
  }]
}, {
  timestamps: true,
  statics: {
    async findOrCreateConversation(userId, advisorId) {
      if (userId.equals(advisorId)) {
        throw new Error("Cannot create conversation with yourself");
      }

      const [user, advisor] = await Promise.all([
        this.model("UserModel").findById(userId),
        this.model("UserModel").findById(advisorId)
      ]);

      if (!user || !advisor) {
        throw new Error("User or Advisor not found");
      }

      if (user.roles !== "User" || advisor.roles !== "Advisor") {
        throw new Error("Participants must be 1 User and 1 Advisor");
      }

      const existing = await this.findOne({
        participants: { $all: [userId, advisorId] }
      });

      if (existing) return existing;

      return this.create({
        participants: [userId, advisorId],
        unreadCount: new Map([[userId.toString(), 0], [advisorId.toString(), 0]])
      });
    }
  }
});

// Indexes
conversationSchema.index({ participants: 1 });
conversationSchema.index({ "lastMessage.createdAt": -1 });
conversationSchema.index({ internship: 1 });

// Virtuals (only valid if participants are populated)
conversationSchema.virtual('advisor').get(function () {
  return (this.participants || []).find(p => p.roles === "Advisor");
});

conversationSchema.virtual('user').get(function () {
  return (this.participants || []).find(p => p.roles === "User");
});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
