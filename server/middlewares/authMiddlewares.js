import jwt from 'jsonwebtoken';
import UserModel from '../Models/UserModel.js';
import { ErrorHandler } from '../Utils/error.js';
import dotenv from 'dotenv';

dotenv.config();

// Base authentication middleware
export const authenticate = async (req, res, next) => {
  let token;

  // Check both cookies and Authorization header
  if (req.cookies?.mycookie) {
    token = req.cookies.mycookie;
  } else if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next( ErrorHandler(401, 'Not authenticated: no token provided'));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findById(decoded.id).select('-password');
  

    if (!user) {
      return next( ErrorHandler(401, 'User no longer exists'));
    }

    // Check if user is blocked
    if (user.blocked || user.status === 'blocked') {
      return next( ErrorHandler(403, 'Your account has been blocked'));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    return next( ErrorHandler(401, 'Invalid or expired token'));
  }
};

// Role-based authorization middleware
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    if (!req.user) {
      return next( ErrorHandler(401, 'User not authenticated'));
    }

    const normalizedRoles = roles.map(r => r.toLowerCase());
    const userRole = req.user.roles.toLowerCase();
    
    if (!normalizedRoles.includes(userRole)) {
      return next(
        ErrorHandler(
          403,
          `Access denied. Required role: ${roles.join(' or ')}`
        )
      );
    }
    

    // Additional status check for certain roles
    if (req.user.roles === 'Admin' && req.user.status !== 'approved') {
      return next( ErrorHandler(403, 'Admin account not approved'));
    }

    if (req.user.roles === 'Advisor' && req.user.status !== 'approved') {
      return next( ErrorHandler(403, 'Advisor account not approved'));
    }

    if (req.user.roles === 'User' && req.user.userStatus !== 'approved') {
      return next( ErrorHandler(403, 'User account not approved'));
    }

    next();
  };
};

// Specific role middlewares for convenience
export const protect = authenticate;
export const adminOnly = [authenticate, authorize(['Admin'])];
export const advisorOnly = [authenticate, authorize(['Advisor'])];
export const userOnly = [authenticate, authorize(['User'])];
export const facultyOnly = [authenticate, authorize(['Faculty'])];
export const protectedRoute = authenticate;