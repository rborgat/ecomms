const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({ _id: String }, { strict: false });
const Session = mongoose.model("sessions", SessionSchema, "sessions");

module.exports = Session;
