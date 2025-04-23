import UserModel from "../Models/UserModel.js";
import { ErrorHandler } from "../Utils/error.js";
import bcryptjs, { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const SignUp = async (req, res, next) => {
  const { userName, email, password, roles } = req.body;
  console.log("userName", userName);
  console.log("email", email);
  console.log("password", password);
  console.log("roles", roles);

  try {
    if (!userName || !email || !password || !roles) {
      return next(
        ErrorHandler(400, "All fields are required, including role.")
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return next(ErrorHandler(400, "User already exists."));

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    let newUserData = {
      userName,
      email,
      password: hashedPassword,
      roles,
    };

    if (roles === "Faculty" || roles === "faculty") {
      newUserData.status = "pending"; // Only status, no adminId
    }

    if (roles === "Admin" || roles === "admin") {
      newUserData.status = "pending";
    }

    const newUser = new UserModel(newUserData);
    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser._doc;

    res.status(201).json({
      message:
        "User created successfully" +
        (roles.toLowerCase() !== "user" ? ". Awaiting admin approval." : "."),
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error in SignUp:", error);
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  const { email, password, roles } = req.body;
  console.log(email);
  console.log(password);
  console.log(roles);
  try {
    if (!email || !password || !roles) {
      return next(ErrorHandler(400, "All fields are required ***"));
    }
    const user = await UserModel.findOne({ email });
    console.log("userroles", user.roles);
    if (!user) {
      return next(ErrorHandler(401, "no email user from signin ***"));
    }
    const validatedPassword = await bcryptjs.compare(password, user.password);
    if (!validatedPassword) {
      return next(ErrorHandler(401, "Invalid Password ***"));
    }
    if (roles !== user.roles) {
      return next(ErrorHandler(400, "Invalid role ***"));
    }
    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    const { password: userPassword, ...rest } = user._doc;
    return res
      .status(200)
      .cookie("mycookie", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const UpdetUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  const profile = req.file ? `/uploads/${req.file.filename}` : undefined; // Use undefined instead of null for MongoDB updates
  const { userId } = req.params;

  try {
    // Create update object with only provided fields
    const updateData = {};

    if (userName) updateData.userName = userName;
    if (email) updateData.email = email;
    if (profile) updateData.profile = profile;

    // Only hash and update password if it's provided
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      updateData.password = bcryptjs.hashSync(password, salt);
    }

    // Use findByIdAndUpdate for ID-based updates
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error); // Use console.error for errors
    next(error);
  }
};

// GET /api/AuthRoute/pending/:adminId
export const getPendingFacultyByAdmin = async (req, res) => {
  try {
    const users = await UserModel.find({
      roles: "Faculty",
      status: "pending",
    });

    if (users.length === 0) {
      return res
        .status(200)
        .json({ message: "No pending users found", users: [] });
    }

    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching pending faculty:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT /api/auth/approve/:id
export const approveUser = async (req, res, next) => {
  try {
    const adminId = req.user?.id; // Assume populated by middleware (JWT, session, etc.)

    const updated = await UserModel.findByIdAndUpdate(
      req.params.id,
      { status: "approved", adminId },
      { new: true }
    ).select("-password");

    if (!updated) {
      return next(ErrorHandler(404, "User not found"));
    }

    res.status(200).json({ message: "User approved", user: updated });
  } catch (err) {
    next(err);
  }
};

// Example route for faculty status
export const getPendingFacuity = async (req, res) => {
  try {
    const faculty = await UserModel.findById(req.params.facultyId);
    if (!faculty) return res.status(404).json({ message: "Faculty not found" });
    res.json({ status: faculty.status, faculty });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
