const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: String,
  date: Date,
  reason: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "pending" }, // ✅ Add this
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
