import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { logCheckIn } from "../services/api";

const GOALS = [
  { id: 1, title: "Workout" },
  { id: 2, title: "Study AI" },
  { id: 3, title: "Meditation" },
];

export default function CheckIn() {
  const [completed, setCompleted] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggle = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const ids = Object.entries(completed)
        .filter(([, v]) => v)
        .map(([k]) => Number(k));

      await Promise.allSettled(ids.map(logCheckIn));

      localStorage.setItem("lastCheckIn", new Date().toISOString());
      localStorage.setItem("completedGoals", JSON.stringify(ids));

      setSubmitted(true);
    } catch (err) {
      console.error("Check-in failed:", err);
      setError("Could not submit check-in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm w-full max-w-sm p-6">
        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-slate-900">Logged!</h2>
            <p className="text-slate-500 mt-1">Great work. See you tomorrow.</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-1 text-slate-900">
              Daily Check-In
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              Tap each goal you completed today
            </p>

            <div className="space-y-3 mb-6">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => toggle(g.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition ${
                    completed[g.id]
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  {completed[g.id] ? (
                    <CheckCircle className="w-5 h-5 text-indigo-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300" />
                  )}
                  <span className="font-medium">{g.title}</span>
                </button>
              ))}
            </div>

            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={!Object.values(completed).some(Boolean) || loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition"
            >
              {loading ? "Submitting..." : "Submit Check-In"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}