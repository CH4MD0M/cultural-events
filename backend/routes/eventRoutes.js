const express = require("express");
const router = express.Router();

const {
  getEvents,
  getUniqueGenres,
} = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/genres", getUniqueGenres);

module.exports = router;
