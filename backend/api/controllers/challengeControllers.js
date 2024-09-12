const asyncHandler = require("express-async-handler");
const Challenge = require("../models/challengeModel");

const getAllChallenges = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = 30;
    const keyword = req.query.keyword || "";

    let challenges = await Challenge.find({
      name: { $regex: keyword, $options: "i" },
    })
      .skip(page * limit)
      .limit(limit);

    res.status(200).json(challenges);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

const getChallenge = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findById(id);
    res.status(200).json(challenge);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

const postChallenge = asyncHandler(async (req, res) => {
  try {
    const challenge = await Challenge.create(req.body);
    res.status(200).json({ challenge });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

const putChallenge = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findByIdAndUpdate(id, req.body);
    if (!challenge) {
      return res
        .status(404)
        .json({ message: `cannot find any challenge with ID ${id}` });
    }
    res.status(200).json(challenge);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

const deleteChallenge = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findByIdAndDelete(id);
    if (!challenge) {
      return res
        .status(404)
        .json({ message: `cannot find any challenge with ID ${id}` });
    }
    res.status(200).json(challenge);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getAllChallenges,
  getChallenge,
  postChallenge,
  putChallenge,
  deleteChallenge,
};
