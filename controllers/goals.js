const cloudinary = require("../middleware/cloudinary");
const Goal = require("../models/Goal");
module.exports = {
  getGoals: async (req, res) => {
    try {
      // Get user ID from route parameters
      const userId = req.params.id;

      // Ensure the user ID is valid
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      // Fetch the newest goals document for the specified user
      const userGoals = await UserGoal.findOne({
        userId: mongoose.Types.ObjectId(userId),
      }).sort({ createdAt: -1 });

      if (userGoals) {
        res.json(userGoals);
      } else {
        res.status(404).json({ error: "Goals not found for the user" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  scheduleEmptyGoals: async (req, res) => {
    console.log("Creating goals for all users");

    try {
      // Get all users
      const users = await User.find();

      // Create a new Goal for each user
      for (let user of users) {
        const newGoal = new Goal({
          userId: user._id, // Assign ObjectId directly as your schema expects it
          goals: [
            {
              goal: "", // Assuming you want it to be empty to start
              goalValue: 0, // A default value, adjust as necessary
              accomplished: false,
            },
          ],
        });

        // Save the new goal
        await newGoal.save();
      }

      console.log("Goals created for all users");
      res.status(200).json({ message: "Goals created for all users" });
    } catch (err) {
      console.error("An error occurred while creating goals: ", err);
      res.status(500).json({
        message: "An error occurred while creating goals",
        error: err,
      });
    }
  },
};
