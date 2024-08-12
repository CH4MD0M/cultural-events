const moment = require("moment");
const Event = require("../models/Event");

const parsePeriod = (periodString) => {
  const [start, end] = periodString.split("~");
  return {
    start: moment(start.trim(), "YYYY-MM-DD"),
    end: moment(end ? end.trim() : start.trim(), "YYYY-MM-DD"),
  };
};

const getEventStatus = (period, currentDate) => {
  const { start, end } = parsePeriod(period);

  if (currentDate.isBefore(start, "day")) {
    return "upcoming";
  } else if (currentDate.isAfter(end, "day")) {
    return "closed";
  } else {
    return "ongoing";
  }
};

const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const genre = req.query.genre;
    const status = req.query.status;

    let query = {};
    const currentDate = moment();

    if (genre) {
      query.GENRE = genre;
    }

    let events = await Event.find(query);

    if (status) {
      events = events.filter((event) => {
        const eventStatus = getEventStatus(event.PERIOD, currentDate);
        return status === "all" || status === eventStatus;
      });
    }

    const total = events.length;
    events = events.slice(skip, skip + limit);

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

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "이벤트를 찾을 수 없습니다." });
    }

    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
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

const searchEvents = async (req, res) => {
  try {
    const { query, page = 1, limit = 10, genre } = req.query;
    const skip = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({ message: "검색어를 입력해주세요." });
    }

    const searchRegex = new RegExp(query, "i");

    let searchQuery = {
      $or: [{ TITLE: searchRegex }, { DESCRIPTION: searchRegex }],
    };

    if (genre) {
      searchQuery.GENRE = genre;
    }

    const events = await Event.find(searchQuery)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ ISSUED_DATE: -1 });

    const total = await Event.countDocuments(searchQuery);

    res.json({
      events,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalEvents: total,
    });
  } catch (error) {
    console.error("Error searching events:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, getEventById, getUniqueGenres, searchEvents };
