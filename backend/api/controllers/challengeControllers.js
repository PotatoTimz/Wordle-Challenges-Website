const asyncHandler = require("express-async-handler");
const Challenge = require("../models/challengeModel");

const getAllChallenges = asyncHandler(async (req, res) => {
  try {
    const challenge = await Challenge.find({});

    if (req.query.keyword === undefined) {
      res.status(200).json(challenge);
    }

    let queryPassChallenges = [];
    challenge.forEach((challenge) => {
      if (
        challenge.name.toLowerCase().includes(req.query.keyword.toLowerCase())
      ) {
        queryPassChallenges.push(challenge);
      }
    });

    res.status(200).json(queryPassChallenges);
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
