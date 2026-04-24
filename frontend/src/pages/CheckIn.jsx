import { useState } from "react";
import { CheckCircle, Circle, Plus } from "lucide-react";

export default function CheckIn() {
  const [goals, setGoals] = useState([""]);
  const [savedGoals, setSavedGoals] = useState([]);
  const [completed, setCompleted] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle goal input
  const handleChange = (index, value) => {
    const updated = [...goals];
    updated[index] = value;
    setGoals(updated);
  };

  // Add new goal (max 5)
  const addGoal = () => {
    if (goals.length < 5) {
      setGoals([...goals, ""]);
    }
  };

  // Save goals
  const handleSaveGoals = () => {
    const filtered = goals.filter((g) => g.trim() !== "");
    if (filtered.length > 0) {
      setSavedGoals(filtered);
    }
  };

  // Toggle completed
  const toggle = (index) => {
    setCompleted((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Submit
  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-sm">

        {/* SUCCESS */}
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold">Logged!</h2>
            <p className="text-gray-500 mt-1">
              Great work. See you tomorrow.
            </p>
          </div>

        ) : savedGoals.length === 0 ? (

          /* STEP 1: INPUT GOALS */
          <>
            <h1 className="text-2xl font-bold mb-2">Set Your Goals</h1>
            <p className="text-gray-400 text-sm mb-4">
              Add up to 5 goals for today
            </p>

            <div className="space-y-2 mb-4">
              {goals.map((goal, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Goal ${index + 1}`}
                  value={goal}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />
              ))}
            </div>

            {/* ADD GOAL BUTTON */}
            <button
              onClick={addGoal}
              disabled={goals.length >= 5}
              className="flex items-center gap-2 text-sm text-brand-600 mb-4 disabled:opacity-40"
            >
              <Plus className="w-4 h-4" />
              Add Goal
            </button>

            <button
              onClick={handleSaveGoals}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2 rounded-lg"
            >
              Continue
            </button>
          </>

        ) : (

          /* STEP 2: CHECK-IN */
          <>
            <h1 className="text-2xl font-bold mb-1">Daily Check-In</h1>
            <p className="text-gray-400 text-sm mb-6">
              Tap what you completed
            </p>

            <div className="space-y-3 mb-6">
              {savedGoals.map((goal, index) => (
                <button
                  key={index}
                  onClick={() => toggle(index)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border
                    ${
                      completed[index]
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  {completed[index] ? (
                    <CheckCircle className="w-5 h-5 text-brand-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                  <span className="font-medium">{goal}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!Object.values(completed).some(Boolean)}
              className="w-full bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white font-semibold py-3 rounded-xl"
            >
              Submit Check-In
            </button>
          </>
        )}
      </div>
    </div>
  );
}