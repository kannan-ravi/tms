import notificationModel from "../models/notification.model.js";

export const getUserNotifications = async (req, res, next) => {
  const { id } = req.params;
  try {
    const notifications = await notificationModel.find(
      {
        receiver: { $in: [id] },
      },
      {
        message: 1,
        task: 1,
        is_seen: 1,
        type: 1,
      }
    );
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

// export const markAsSeen = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const notification = await notificationModel.findById(id);
//     if (!notification) {
//       return next(customErrorHandler(404, "Notification not found"));
//     }
//     notification.is_seen = true;
//     await notification.save();
//     res.status(200).json(notification);
//   } catch (error) {
//     next(error);
//   }
// }


export const markAsSeen = async (req, res, next) => {
  const { id } = req.params;
}