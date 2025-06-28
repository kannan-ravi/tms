import usersModel from "../models/users.model.js";
import chatModel from "../models/chat.model.js";
import { customErrorHandler } from "../middleware/errorHandler.js";

export const fetchChats = async (req, res, next) => {
  try {
    const allChats = await chatModel
      .find({
        users: { $elemMatch: { $eq: req.user.id } },
      })
      .populate("users", "-password")
      .populate("latest_message")
      .populate("group_admin", "-password")
      .sort({ updatedAt: -1 });

    const resultedAllChats = await usersModel.populate(allChats, {
      path: "latest_message.sender",
      select: "full_name profile_image_url email",
    });
    res.status(200).json(resultedAllChats);
  } catch (error) {
    next(error);
  }
};

export const createGroupChat = async (req, res, next) => {
  const { users, name } = req.body;

  if (!name) {
    return next(customErrorHandler(400, "Please provide all fields"));
  }

  // if (users.length < 2) {
  //   return next(
  //     customErrorHandler(
  //       400,
  //       "More than 2 users are required to form a group chat"
  //     )
  //   );
  // }

  users.push(req.user.id);

  try {
    const groupChat = await chatModel.create({
      chat_name: name,
      is_group_chat: true,
      users: users,
    });

    const fullGruoupChat = await chatModel
      .findOne({
        _id: groupChat._id,
      })
      .populate("users", "-password")
      .populate("group_admin", "-password");
    res.status(200).json(fullGruoupChat);
  } catch (error) {
    next(error);
  }
};

export const getAllTeamChat = async (req, res, next) => {
  try {
    const allTeamChats = await chatModel.find({}, { chat_name: 1, group_admin: 1 }).populate("group_admin", "full_name");
    res.status(200).json(allTeamChats);
  } catch (error) {
    next(error);
  }
};

export const deleteGroupChat = async (req, res, next) => {
  const { id } = req.params;

  try {
    const groupChat = await chatModel.findByIdAndDelete({ _id: id });
    if (!groupChat) {
      return next(customErrorHandler(404, "Chat not found"));
    }
    res.status(200).json("Chat deleted Successfully");
  } catch (error) {
    next(error);
  }
};

export const fetchSingleChat = async (req, res, next) => {
  const { id } = req.params;
  try {
    const singleChat = await chatModel
      .findById(id)
      .populate("users", "full_name type")
      .populate("group_admin", "full_name");
    res.status(200).json(singleChat);
  } catch (error) {
    next(error);
  }
};
