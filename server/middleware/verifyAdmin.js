import jwt from "jsonwebtoken";
import { customErrorHandler } from "./errorHandler.js";
import usersModel from "../models/users.model.js";

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.tms_token;
  if (!token) {
    return next(customErrorHandler(401, "Please login first"));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return next(customErrorHandler(401, "Token is not valid"));

    req.user = user;

    if (!user.id) {
      return next(customErrorHandler(401, "Admin Id is not valid"));
    }

    const validAdmin = await usersModel.findById(req.user.id);

    if (!validAdmin) {
      return next(customErrorHandler(404, "Admin not found"));
    }

    if (validAdmin.type !== "admin") {
      return next(customErrorHandler(401, "You are not an Admin"));
    }
    next();
  });
};
