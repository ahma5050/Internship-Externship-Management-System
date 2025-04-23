import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      type: String,
      enum: ["User", "Faculty", "Advisor", "Admin"], // ← added "admin"
      default: "User",
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
    },
    adminId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: false,
      default: undefined, // important to prevent automatic []
    },
  },
  { timestamps: true }
);

// Use the singular “User” so your `ref: "User"` works:
const UserModel = mongoose.model("UserModel", UserSchema);
export default UserModel;
