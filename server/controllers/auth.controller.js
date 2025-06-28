import { customErrorHandler } from "../middleware/errorHandler.js";
import chatModel from "../models/chat.model.js";
import teamModel from "../models/team.model.js";
import usersModel from "../models/users.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ! USER LOGIN CONTROLLER
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const validUser = await usersModel.findOne({ email });

  try {
    if (!validUser) {
      return next(customErrorHandler(404, "Invalid email and password"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(customErrorHandler(401, "Invalid email and password"));
    }

    const populatedUser = await validUser.populate({
      path: "team",
      select: "team_chat, name",
      populate: {
        path: "team_chat",
        select: "chat_name group_admin",
        populate: {
          path: "group_admin",
          select: "full_name",
        },
      },
    });

    const tmsToken = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...others } = populatedUser._doc;
    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    res
      .cookie("tms_token", tmsToken, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ ...others });
  } catch (error) {
    next(error);
  }
};

// ! USER REGISTRATION CONTROLLER (NEED IMPROVEMENT)
export const register = async (req, res, next) => {
  const {
    username,
    email,
    password,
    full_name,
    position,
    profile_image_url,
    phone_number,
    team,
    type,
  } = req.body;

  if (!email || !password || !full_name || !position) {
    return next(customErrorHandler(400, "All fields are required"));
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new usersModel({
    username,
    email,
    password: hashedPassword,
    full_name,
    position,
    profile_image_url:
      profile_image_url ||
      `https://eu.ui-avatars.com/api/?name=${
        full_name.split(" ")[0]
      }=&size=250`,
    phone_number,
    team,
    type,
  });

  try {
    const existingTeam = await teamModel.findById(team);
    const existingChat = await chatModel.findById({
      _id: existingTeam.team_chat,
    });
    if (!existingTeam) {
      return next(customErrorHandler(404, "Team Not Found"));
    }

    if (!existingChat) {
      return next(customErrorHandler(404, "Chat Not Found"));
    }

    existingTeam.users.push(newUser._id);
    if (newUser.type === "rep") {
      existingChat.group_admin = newUser._id;
    }
    existingChat.users.push(newUser._id);
    await existingTeam.save();
    await existingChat.save();
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

// ! USER LOGOUT CONTROLLER
export const logout = async (req, res) => {
  res.clearCookie("tms_token").status(200).json("Logout Successful");
};

// ! FORGOT PASSWORD CONTROLLER
export const forgetPassword = async (req, res) => {};
