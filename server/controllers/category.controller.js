import categoryModel from "../models/category.model.js";

export const getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await categoryModel.find();

    res.status(200).json(allCategories);
  } catch (error) {
    next(error);
  }
};
