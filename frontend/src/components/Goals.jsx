import React, { useState, useEffect } from "react";

const Goal = ({ user }) => {
  const [goals, setGoals] = useState([]);
  const [isMakingChanges, setIsMakingChanges] = useState(false);
  console.log(user);

  const fetchGoals = async () => {
    try {
      const response = await fetch(`/api/goals/getGoals/${user._id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setGoals(data.goals);
    } catch (error) {
      console.error("There was a problem fetching goals:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleChange = (index, field, event) => {
    setIsMakingChanges(true);
    const newValue = event.target.value;

    setGoals((prevGoals) => {
      const newGoals = [...prevGoals];
      newGoals[index][field] = newValue;
      return newGoals;
    });
  };

  const addNewGoal = () => {
    setGoals((prevGoals) => {
      // Get the last goal in the array
      const lastGoal = prevGoals[prevGoals.length - 1];

      // Only add a new goal if the last one isn't empty
      if (!lastGoal || lastGoal.goal) {
        setIsMakingChanges(true);
        return [
          ...prevGoals,
          {
            goal: "",
            goalValue: 0,
            accomplished: false,
            id: `${Date.now()}`,
          },
        ];
      } else {
        return prevGoals; // Return the previous goals if condition is not met
      }
    });
  };

  const handleDeleteGoal = (goalId) => {
    setIsMakingChanges(true);
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
  };

  const updateGoal = async () => {};

  const goalsElement = (
    <div>
      <h2>Goals</h2>
      {goals.length === 0 ? (
        <div>No goals</div>
      ) : (
        goals.map((goal, index) => (
          <div key={goal.id}>
            <input
              type="text"
              value={goal.goal}
              onChange={(event) => handleChange(index, "goal", event)}
              placeholder="Goal"
            />
            <input
              type="number"
              value={goal.goalValue}
              onChange={(event) => handleChange(index, "goalValue", event)}
              placeholder="Goal Amount $"
            />
            <button type="button" onClick={() => handleDeleteGoal(goal.id)}>
              Delete 🗑️
            </button>
          </div>
        ))
      )}
      <button type="button" onClick={addNewGoal}>
        Add New Goal
      </button>
    </div>
  );

  return (
    <div>
      <form
        // action={`/api/updatefacilityinfosheet/${}?_method=PUT`}
        encType="multipart/form-data"
        method="POST"
      >
        <button className="btn submitBtn" type="submit">
          Save Changes
        </button>
      </form>
      {goalsElement}
    </div>
  );
};

export default Goal;
