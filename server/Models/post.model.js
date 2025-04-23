import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel", // This is the faculty who created the post
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Remote", "Hybrid", "On-site"],
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
