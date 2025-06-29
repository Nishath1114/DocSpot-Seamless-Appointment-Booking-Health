
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/my-appointments", {
        headers: {
          Authorization: token,
        },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>You have no appointments yet.</p>
      ) : (
        <table className="table table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Booked At</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.doctor}</td>
                <td>{new Date(appt.date).toLocaleDateString()}</td>
                <td>{appt.reason}</td>
                <td>
                  <span
                    className={`badge bg-${
                      appt.status === "approved"
                        ? "success"
                        : appt.status === "rejected"
                        ? "danger"
                        : "warning"
                    }`}
                  >
                    {appt.status}
                  </span>
                </td>
                <td>{new Date(appt.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
