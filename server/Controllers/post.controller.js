import { ErrorHandler } from "../Utils/error.js";
import Post from "../Models/post.model.js";

export const creatPost = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);

    // 1. Authorization Check
    if (!req.user?.roles) {
      return next(ErrorHandler(403, "You are not authorized to create a post!"));
    }

    const {
      title,
      companyName,
      location,
      type,
      duration,
      category,
      description // Added description field
    } = req.body;

    // 2. Required Fields Check (now includes description)
    if (!title || !companyName || !location || !type || !duration || !description) {
      return next(ErrorHandler(400, "Missing required fields including description!"));
    }

    // 3. Image Handling
    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    // 4. Slug Generation
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    // 5. Create Post (now includes description)
    const newPost = new Post({
      title,
      companyName,
      location,
      type,
      duration,
      description, // Added description field
      category: category || "Uncategorized",
      slug,
      image: imageUrl,
      facultyId: req.user.id,
    });

    const savedPost = await newPost.save();
    console.log("Post created successfully:", savedPost);

    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    next(error);
  }
};

// Get Posts with Filtering & Pagination
export const getPost = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex || 0);
    const limit = parseInt(req.query.limit) || 5;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const filters = {
      ...(req.query.facultyId && { facultyId: req.query.facultyId }), // ✅ use facultyId instead of userId
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { companyName: { $regex: req.query.searchTerm, $options: 'i' } },
          { description: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    };

    const posts = await Post.find(filters)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({ posts });
  } catch (err) {
    console.error("Error in getPost:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete Post
export const deletePost = async (req, res, next) => {
  if (!req.user.roles === "Faculty")
    return next(ErrorHandler(401, "You are unauthorized to delete"));
  
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json({ message: "Post has been deleted." });
  } catch (error) {
    next(error);
  }
}

export const updatepost = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(ErrorHandler(403, "You are not authorized to update it"));
  }

  const {
    title,
    companyName,
    location,
    type,
    duration,
    category,
    description // Added description field
  } = req.body;

  console.log("title:", title);
  console.log("companyName:", companyName);
  console.log("location:", location);
  console.log("type:", type);
  console.log("duration:", duration);
  console.log("category:", category);
  console.log("description:", description); // Added description log
  console.log("file:", req.file);

  try {
    const existingPost = await Post.findById(req.params.postId);
    if (!existingPost) {
      return next(ErrorHandler(404, "Post not found"));
    }

    // Use existing image unless a new one is uploaded
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : existingPost.image;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title,
          companyName,
          location,
          category: category || existingPost.category,
          type,
          duration,
          description: description || existingPost.description, // Added description handling
          image: imageUrl,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};