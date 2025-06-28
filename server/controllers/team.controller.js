import teamModel from "../models/team.model.js";

export const getSingleTeam = async (req, res, next) => {
  const { id } = req.params;
  try {
    const team = await teamModel.findById(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // populate the team_chat
    const resultedTeam = await team.populate({
      path: "users",
      select: "full_name",
    });
    res.status(200).json(resultedTeam);
  } catch (error) {
    next(error);
  }
};
export const createTeam = async (req, res, next) => {
  const { name, team_chat } = req.body;
  const options = {
    name,
    team_chat: team_chat,
  };
  try {
    const team = new teamModel(options);
    await team.save();
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};
export const getAllTeams = async (req, res, next) => {
  try {
    const allTeams = await teamModel
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();

    res.status(200).json(allTeams);
  } catch (error) {
    next(error);
  }
};
export const deleteTeam = async (req, res, next) => {
  const { id } = req.params;
  try {
    const team = await teamModel.findByIdAndDelete({ _id: id });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    next(error);
  }
};
