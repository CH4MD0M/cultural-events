const express = require("express");
const router = express.Router();

const {
  getEvents,
  getEventById,
  getUniqueGenres,
  searchEvents,
} = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/genres", getUniqueGenres);
router.get("/search", searchEvents);
router.get("/:id", getEventById);

module.exports = router;
