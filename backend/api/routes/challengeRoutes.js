const express = require("express");
const router = express.Router();

const {
  getAllChallenges,
  getChallenge,
  postChallenge,
  putChallenge,
  deleteChallenge,
} = require("../controllers/challengeControllers");

router.route("/").get(getAllChallenges).post(postChallenge);
router
  .route("/:id")
  .get(getChallenge)
  .put(putChallenge)
  .delete(deleteChallenge);

module.exports = router;
