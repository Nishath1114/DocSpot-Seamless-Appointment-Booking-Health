import React, { useState } from "react";
import axios from "axios";

const BookAppointment = () => {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/book", {
        doctor,
        date,
        reason,
      }, {
        headers: { Authorization: token }
      });

      setMessage("Appointment booked successfully!");
      setDoctor("");
      setDate("");
      setReason("");
    } catch (err) {
      setMessage("Booking failed. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Doctor Name</label>
          <input
            type="text"
            className="form-control"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Reason</label>
          <textarea
            className="form-control"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success">Book Now</button>
        {message && <p className="mt-3 text-info">{message}</p>}
      </form>
    </div>
  );
};

export default BookAppointment;
