import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const Verifytoken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(404, "User not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is Not Valid"));
    req.user = user;
    next();
  });
};

export const verifyUser = async (req, res, next) => {
  Verifytoken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are Not autherized"));
    }
  });
};

export const verifyAdmin = async (req, res, next) => {
  Verifytoken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are Not autherized"));
    }
  });
};
