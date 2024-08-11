const Event = require("../models/Event");

const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const events = await Event.find().skip(skip).limit(limit);
    const total = await Event.countDocuments();

    console.log(`Found ${events.length} events (page ${page})`);
    res.json({
      events,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalEvents: total,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: error.message });
  }
};

const getUniqueGenres = async (req, res) => {
  try {
    const genres = await Event.distinct("GENRE");
    console.log(`Found ${genres.length} unique genres`);
    console.log(genres);
    res.json({
      genres,
      totalGenres: genres.length,
    });
  } catch (error) {
    console.error("Error fetching unique genres:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, getUniqueGenres };
