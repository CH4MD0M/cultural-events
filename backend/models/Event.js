const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  TITLE: String,
  CNTC_INSTT_NM: String,
  COLLECTED_DATE: String,
  ISSUED_DATE: String,
  DESCRIPTION: { type: String, default: null },
  IMAGE_OBJECT: String,
  LOCAL_ID: String,
  URL: String,
  VIEW_COUNT: { type: Number, default: null },
  SUB_DESCRIPTION: { type: String, default: null },
  SPATIAL_COVERAGE: { type: String, default: null },
  EVENT_SITE: { type: String, default: null },
  GENRE: String,
  DURATION: { type: String, default: null },
  NUMBER_PAGES: { type: Number, default: null },
  TABLE_OF_CONTENTS: { type: String, default: null },
  AUTHOR: { type: String, default: null },
  CONTACT_POINT: String,
  ACTOR: { type: String, default: null },
  CONTRIBUTOR: String,
  AUDIENCE: String,
  CHARGE: String,
  PERIOD: String,
  EVENT_PERIOD: String,
});

module.exports = mongoose.model("Event", eventSchema);
