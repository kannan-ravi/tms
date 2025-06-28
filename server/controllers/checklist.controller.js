import { customErrorHandler } from "../middleware/errorHandler.js";
import checklistModel from "../models/checklist.model.js";
import tasksModel from "../models/tasks.model.js";

export const createCheckList = async (req, res, next) => {
  try {
    const isValidTask = await tasksModel.findById(req.body[0].task_id);
    if (!isValidTask) {
      return next(customErrorHandler(404, "Task not found"));
    }

    const checklistArray = [];
    for (let i = 0; i < req.body.length; i++) {
      const task = req.body[i];
      if (!task.list) {
        continue;
      } else if (!task.task_id) {
        return next(
          customErrorHandler(400, "Invalid data passed into request")
        );
      }
      const checklist = await checklistModel.create({
        list: task.list,
        isChecked: task.isChecked,
        task: task.task_id,
      });

      checklistArray.push(checklist._id);
      await tasksModel.findByIdAndUpdate(task.task_id, {
        $push: { checklist: checklist._id },
      });
    }

    const checklist = await checklistModel
      .find({
        _id: { $in: checklistArray },
      })
      .select("_id, list isChecked");

    res.status(200).json(checklist);
  } catch (error) {
    next(error);
  }
};

export const deleteCheckList = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(customErrorHandler(400, "Invalid data passed into request"));
  }

  try {
    const checklist = await checklistModel.findById(id);
    if (!checklist) {
      return next(customErrorHandler(404, "Checklist not found"));
    }
    const taskToUpdate = await tasksModel.find({ checklist: id });

    for (const task of taskToUpdate) {
      task.checklist.pull(id);
      await task.save();
    }
    await checklistModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Checklist deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const editCheckList = async (req, res, next) => {
  const { isChecked, _id } = req.body;

  try {
    const checklist = await checklistModel.findByIdAndUpdate(_id, {
      isChecked: isChecked,
    });
    if (!checklist) {
      return next(customErrorHandler(404, "Checklist not found"));
    }

    res.status(200).json({ message: "Checklist updated successfully" });
  } catch (error) {
    next(error);
  }
};
