import { customErrorHandler } from "../middleware/errorHandler.js";
import commentModel from "../models/comment.model.js";
import tasksModel from "../models/tasks.model.js";

export const createComments = async (req, res, next) => {
  try {
    const validTask = await tasksModel
      .findById(req.body.task)
      .populate("assigned_to", "full_name profile_image_url")
      .populate("checklist", "isChecked list")
      .populate({
        path: "comments",
        select: "comment",
        populate: {
          path: "user",
          select: "full_name profile_image_url",
        },
      });
    if (!validTask) {
      return next(customErrorHandler(404, "Task not found"));
    }

    const createComment = await commentModel.create({
      user: req.user.id,
      comment: req.body.comment,
      task: req.body.task,
    });

    await createComment.populate({
      path: "user",
      select: "full_name profile_image_url",
    });

    await tasksModel.findByIdAndUpdate(req.body.task, {
      $push: { comments: createComment._id },
    });

    res.status(200).json(createComment);
  } catch (error) {
    next(error);
  }
};
