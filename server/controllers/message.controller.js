import { customErrorHandler } from "../middleware/errorHandler.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import usersModel from "../models/users.model.js";

export const sendMessage = async (req, res, next) => {
  const { content, chatId, type } = req.body;

  if (!content || !chatId) {
    return next(customErrorHandler(400, "Invalid data passed into request"));
  }

  const newMessage = {
    sender: req.user.id,
    message: content,
    chat_name: chatId,
    type,
  };

  try {
    let message = await messageModel.create(newMessage);
    message = await message.populate("sender", "full_name profile_image_url");

    message = await usersModel.populate(message, {
      path: "chat.users",
      select: "full_name profile_image_url",
    });

    await chatModel.findByIdAndUpdate(chatId, {
      latest_message: message,
    });

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const sendDocument = async (req, res, next) => {
  const { chat_name, type } = req.body;

  if (!chat_name || !type) {
    return next(customErrorHandler(400, "Invalid data passed into request"));
  }
  if (!req.file) {
    return next(customErrorHandler(404, "File not found"));
  }

  try {
    const newMessage = {
      sender: req.user.id,
      file: {
        file_url:
          "chat/" + chat_name + `/${req.body.type}/` + req.file.filename,
        file_size: req.file.size,
        file_format: req.file.mimetype,
      },
      chat_name: chat_name,
      type: type,
    };

    let message = await messageModel.create(newMessage);
    message = await message.populate("sender", "full_name profile_image_url");

    message = await usersModel.populate(message, {
      path: "chat.users",
      select: "full_name profile_image_url",
    });

    await chatModel.findByIdAndUpdate(chat_name, {
      latest_message: message,
    });

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const markAsSeen = async (req, res, next) => {
  const { messageId } = req.params;
  const { userId } = req.user;

  if (!messageId) {
    return next(customErrorHandler(400, "Invalid data passed into request"));
  }

  try {
    const message = await messageModel.findById(messageId);
    if (!message.read_by.includes(userId)) {
      message.read_by.push(userId);
      await message.save();
    }
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const getAllMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const messages = await messageModel
      .find({ chat_name: id })
      .populate("sender", "full_name profile_image_url email")
      .populate("chat_name", "chat_name");

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
