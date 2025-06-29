// ✅ Admin: update appointment status
router.put("/appointment/:id/status", authenticateUser, async (req, res) => {
  const { status } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Only admins can update status" });
    }

    const appt = await Appointment.findById(req.params.id);
    if (!appt) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appt.status = status;
    await appt.save();

    res.json({ message: `Appointment marked as ${status}` });
  } catch (err) {
    console.error("Status update error:", err);
    res.status(500).json({ message: "Error updating appointment status" });
  }
});
