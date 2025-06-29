const authenticateUser = require("../middleware/authMiddleware");
router.get("/profile", authenticateUser, (req, res) => {
  res.json({ message: "Welcome to your profile", userId: req.user.id });
});
