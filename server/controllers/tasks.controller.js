import tasksModel from "../models/tasks.model.js";
import usersModel from "../models/users.model.js";
import teamsModel from "../models/team.model.js";
import messageModel from "../models/message.model.js";
import chatModel from "../models/chat.model.js";
import { customErrorHandler } from "../middleware/errorHandler.js";
import categoryModel from "../models/category.model.js";
import { io } from "../socket/socket.js";
import notificationModel from "../models/notification.model.js";
import mongoose from "mongoose";

export const getIndividualsTasks = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(customErrorHandler(400, "Invalid data passed into request"));
  }
  try {
    const task = await tasksModel
      .findOne({ _id: id })
      .populate("assigned_to", "full_name profile_image_url")
      .populate("assigned_by", "full_name profile_image_url")
      .populate("checklist", "isChecked list")
      .populate("follower", "full_name")
      .populate({
        path: "comments",
        select: "comment",
        populate: {
          path: "user",
          select: "full_name profile_image_url",
        },
      });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const createTasks = async (req, res, next) => {
  try {
    if (req.body.title && req.body.assigned_to.length > 0) {
      const user_id = req.user.id;
      const chat_id = req.body.chat_id;

      const chat = await chatModel.findById(chat_id);
      const currentUser = await usersModel
        .findOne({ _id: user_id })
        .populate("team");

      let { category } = req.body;
      if (category && !Array.isArray(category)) {
        category = [category];

        category.map(async (cat) => {
          const findDuplicatCat = await categoryModel.findOne({
            category_name: cat,
          });
          if (!findDuplicatCat) {
            const newCategory = new categoryModel({ category_name: cat });
            await newCategory.save();
          }
        });
      }

      let isPartOfTeam;

      if (Array.isArray(req.body.assigned_to)) {
        isPartOfTeam = currentUser.team.users.some((user) =>
          req.body.assigned_to.includes(user._id.toString())
        );
      } else {
        isPartOfTeam = currentUser.team.users.includes(req.body.assigned_to);
      }

      const newTask = new tasksModel({
        title: req.body.title,
        description: req.body.description,

        dueDate: req.body.dueDate,
        dueTime: req.body.dueTime,
        assigned_to: req.body.assigned_to,
        assigned_by: user_id,
        category: req.body.category,
        follower: req.body.follower,
        is_approved: isPartOfTeam,
        files_url: req.files
          ? req.files.map((file) => "tasks/" + file.filename)
          : [],
      });

      await newTask.save();

      const assignedBy = await newTask.populate("assigned_by", "full_name");

      const newNotification = await notificationModel({
        message:
          "A task has been assigned by " + assignedBy.assigned_by.full_name,
        is_seen: false,
        task: newTask._id,
        type: "task",
        sender: user_id,
        receiver: req.body.assigned_to,
      });

      await newNotification.save();

      if (!newTask.is_approved) {
        const newMessage = {
          sender: user_id,
          message:
            "Task Created Successfully. But waiting for Admin Approval to view the task",
          chat_name: req.body.chat_name,
          task: newTask._id,
          type: "task",
        };

        const createNewMessage = await messageModel.create(newMessage);
        await chatModel.findByIdAndUpdate(req.body.chat_name, {
          latest_message: createNewMessage,
        });

        res.status(200).json(createNewMessage);
      } else if (newTask.is_approved) {
        res.status(200).json("Task created successfully");
      }
    } else {
      next(customErrorHandler(400, "Invalid data passed into request"));
    }
  } catch (error) {
    next(error);
  }
};

export const getMyTeamTasks = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(customErrorHandler(400, "Invalid data passed into request"));
  }

  try {
    const getUser = await usersModel.findOne({ _id: id });

    if (!getUser) {
      return next(customErrorHandler(404, "User not found"));
    }

    const getMyTeam = await teamsModel.findOne({ _id: getUser.team });

    if (!getMyTeam) {
      return next(customErrorHandler(404, "Team not found"));
    }

    const getAdmin = await usersModel.findOne({
      _id: getUser.team,
      group_admin: id,
    });

    const isAdmin = !!getAdmin;

    let tasks;

    if (isAdmin) {
      tasks = await tasksModel
        .find(
          {
            assigned_to: { $in: getMyTeam.users },
            is_approved: true,
          },
          { title: 1, assigned_to: 1, dueTime: 1, assigned_by: 1 }
        )
        .populate("assigned_to", "full_name profile_image_url");
    } else {
      tasks = await tasksModel
        .find(
          {
            assigned_to: { $in: getMyTeam.users },
            is_approved: true,
          },
          {
            title: 1,
            assigned_to: 1,
            dueTime: 1,
            checklist: 1,
            is_approved: 1,
            assigned_by: 1,
          }
        )
        .populate({
          path: "checklist",
          select: "isChecked",
        })
        .populate("assigned_to", "full_name profile_image_url");
    }

    tasks = tasks.map((task) => {
      const checkedCount = task.checklist.filter(
        (item) => item.isChecked
      ).length;
      const uncheckedCount = task.checklist.length - checkedCount;

      const isAssignedToMe = task.assigned_to.some(
        (user) => user._id.toString() === id
      );
      const isAssignedByTeamMember = getMyTeam.users.includes(task.assigned_by);

      return {
        ...task.toObject(),
        checkedCount,
        uncheckedCount,
        isAssignedToMe,
        isAssignedByTeamMember,
      };
    });

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getOtherTeamTasks = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(customErrorHandler(400, "Invalid data passed into request"));
  }

  try {
    const getUser = await usersModel.findOne({ _id: id });
    if (!getUser) {
      return next(customErrorHandler(404, "User not found"));
    }

    const getTeamUser = await teamsModel.findOne({ _id: getUser.team });
    if (!getTeamUser) {
      return next(customErrorHandler(404, "User's team not found"));
    }

    if (getUser.type === "user") {
      const otherTeamTasks = await tasksModel.find(
        {
          assigned_by: id,
          assigned_to: { $nin: getTeamUser.users },
        },
        {
          title: 1,
          assigned_to: 1,
          dueTime: 1,
          checklist: 1,
          assigned_by: 1,
          is_approved: 1,
        }
      );

      if (!otherTeamTasks || otherTeamTasks.length === 0) {
        return next(
          customErrorHandler(
            404,
            "There are no tasks assigned by you to other teams"
          )
        );
      }

      res.status(200).json(otherTeamTasks);
    } else if (getUser.type === "rep") {
      const otherTeamTasks = await tasksModel.find(
        {
          $or: [
            { assigned_by: id },
            { assigned_by: { $in: getTeamUser.users } },
          ],
          assigned_to: { $nin: getTeamUser.users },
        },
        {
          title: 1,
          assigned_to: 1,
          dueTime: 1,
          checklist: 1,
          assigned_by: 1,
          is_approved: 1,
        }
      );

      res.status(200).json(otherTeamTasks);
    }
  } catch (error) {
    next(error);
  }
};

export const getUserTasks = async (req, res, next) => {
  const { id } = req.params;

  try {
    const validUser = await usersModel.findOne({ _id: id });
    if (!validUser) {
      return next(customErrorHandler(404, "Task not found"));
    }

    const tasks = await tasksModel
      .find(
        { assigned_to: id, is_approved: true },
        {
          title: 1,
          assigned_to: 1,
          assigned_by: 1,
          dueTime: 1,
          checklist: 1,
          status: 1,
        }
      )
      .populate("assigned_to", "full_name profile_image_url")
      .populate("assigned_by", "full_name profile_image_url")
      .populate("checklist", "isChecked");

    if (!tasks) {
      return next(customErrorHandler(404, "Tasks not found"));
    }
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const changeTaskStatus = async (req, res, next) => {
  const { taskId, status } = req.body;

  try {
    if (!taskId || !status) {
      return next(customErrorHandler(400, "Invalid data passed into request"));
    }

    const updatedTask = await tasksModel.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return next(customErrorHandler(404, "Task not found"));
    }

    res
      .status(200)
      .json({ message: "Task status updated successfully", task: updatedTask });
  } catch (err) {
    return next(customErrorHandler(500, "Failed to update task status", err));
  }
};

export const editTask = async (req, res, next) => {
  const { id } = req.params;
  const { dueDate, dueTime, messageId } = req.body;
  try {
    const getTask = await tasksModel.findOneAndUpdate(
      { _id: id },
      {
        dueDate,
        dueTime,
        is_approved: true,
      }
    );
    if (!getTask) {
      return next(customErrorHandler(404, "Task not found"));
    }

    const deleteMessage = await messageModel.findByIdAndDelete(messageId);
    if (!deleteMessage) {
      return next(customErrorHandler(404, "Message not found"));
    }
    res.status(200).json(getTask);
  } catch (error) {
    next(error);
  }
};
