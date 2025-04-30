
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      type: String,
      enum: ["User", "Faculty", "Advisor", "Admin"],
      default: "User",
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    // Used only for Faculty, Advisor, Admin
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
    },
    // Used only for User (students)
    userStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
    },
    // Used only for User (students)
    applicationStatus: {
      type: String,
      enum: ["none", "pending", "approved"],
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", UserSchema);
export default UserModel;