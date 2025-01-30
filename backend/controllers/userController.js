const User = require("../models/User");

// Get User Details
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to fetch user details", error: err.message });
  }
};

module.exports = { getUserDetails };
