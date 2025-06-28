import usersModel from "../models/users.model.js ";

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await usersModel.find(
      { type: { $ne: "admin" } },
      { full_name: 1, profile_image_url: 1, type: 1 }
    );
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await usersModel.findByIdAndDelete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};
