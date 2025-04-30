import UserModel from "../Models/UserModel.js";
import { ErrorHandler } from "../Utils/error.js";
import bcryptjs, { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const SignUp = async (req, res, next) => {
  const { userName, email, password, roles } = req.body;

  try {
    // Validate required fields
    if (!userName || !email || !password || !roles) {
      return next(
        ErrorHandler(400, "All fields are required, including role.")
      );
    }

    // Validate role
    if (!["User", "Faculty", "Advisor", "Admin"].includes(roles)) {
      return next(ErrorHandler(400, "Invalid role selected."));
    }

    // Check for existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return next(ErrorHandler(400, "User already exists."));
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Build new user object
    let newUserData = {
      userName,
      email,
      password: hashedPassword,
      roles,
    };

    if (roles === "User") {
      // Students: set userStatus and applicationStatus
      newUserData.userStatus = "pending";
      newUserData.applicationStatus = "none";
    } else {
      // Faculty, Advisor, Admin: set status
      newUserData.status = "pending";
    }

    // Save user
    const newUser = new UserModel(newUserData);
    await newUser.save();

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser._doc;
    res.status(201).json({
      message:
        "User created successfully" +
        (roles === "User"
          ? ""
          : ". Awaiting admin approval."),
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
    console.log("userroles", user);
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

export const getApprovedFaculty = async (req, res) => {
  try {
    const facultyList = await UserModel.find({
      roles: "Faculty",
      status: "approved",
    }).select("-password"); // exclude password

    res.status(200).json({ faculty: facultyList });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const pendingAdvisor = async (req, res, next) => {
  try {
    const advisors = await UserModel.find({
      roles: "Advisor",
      status: "pending",
    });

    res.status(200).json(advisors);
  } catch (error) {
    console.error("Error fetching pending advisors:", error);
    next(error);
  }
};

export const approveAdvisor = async (req, res, next) => {
  const { advisorId, AdminId } = req.body;
 
  console.log("AdminId", AdminId);

  try {
    if (!advisorId || !AdminId) {
      return res.status(400).json({ message: "Advisor ID and Admin ID are required" });
    }

    const advisor = await UserModel.findOneAndUpdate(
      { _id: advisorId, roles: "Advisor", status: "pending" },
      { $set: { status: "approved", approvedBy: AdminId } },
      { new: true }
    );

    if (!advisor) {
      return res.status(404).json({ message: "Advisor not found or already approved" });
    }

    res.status(200).json({ message: "Advisor approved successfully", advisor });
  } catch (error) {
    console.error("Error approving advisor:", error);
    next(error);
  }
};


export const ApprovedAdvisor = async (req, res) => {
  try {
    // Step 1: Fetch all approved advisors
    const advisors = await UserModel.find({
      roles: "Advisor", // note: capital 'A' to match your DB
      status: "approved",
    }).lean(); // plain objects

    if (!advisors.length) {
      return res.status(404).json({ message: "No approved advisors found." });
    }

    // Step 2: Fetch one approved admin (or you can change to find many if needed)
    const admin = await UserModel.findOne({
      roles: "Admin",
      status: "approved",
    }).select("_id userName email profile").lean();

    if (!admin) {
      return res.status(404).json({ message: "No approved admin found." });
    }

    // Step 3: Attach this admin as 'approvedBy' for each advisor (simulate approval)
    const advisorsWithAdmin = advisors.map(advisor => ({
      ...advisor,
      approvedBy: admin,
    }));

    // Step 4: Return
    return res.status(200).json({ advisors: advisorsWithAdmin });
  } catch (error) {
    console.error("Error fetching advisors:", error);
    return res.status(500).json({ message: "Server error while fetching advisors." });
  }
};
//pendinguser to admin
 export const getpendingusertoAdmin = async (req, res) => {
  try {
    const users = await UserModel.find({ userStatus: "pending", roles: "User" }).select("-password");
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching pending users" });
  }
};

export const approvePendingUserbyAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.userStatus === "approved") {
      return res.status(400).json({ message: "User is already approved" });
    }

    user.userStatus = "approved";  // Change status to approved
    await user.save();

    res.json({ message: "User approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while approving user" });
  }
};

export const getApprovedUsersbyAdmin = async (req, res) => {
  try {
    const users = await UserModel.find({ userStatus: "approved", roles: "User" }).select("-password");
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching approved users" });
  }
};

export const getUserStatusforUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching user status" });
  }
};





