import jwt from "jsonwebtoken";
import { customErrorHandler } from "./errorHandler.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.tms_token;
  if (!token) {
    return next(customErrorHandler(401, "Please login first"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(customErrorHandler(401, "Token is not valid"));

    req.user = user;
    next();
  });
};
