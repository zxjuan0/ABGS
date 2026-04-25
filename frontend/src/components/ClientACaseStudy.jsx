import React, { useEffect, useState } from "react";
import { predictClientA } from "../services/api";

const payload = {
  habit_type: "studying",
  activity_type: "screen_based",
  difficulty_level: "medium",
  streak_length: 8,
  missed_days_last_7: 4,
  checkin_hour_avg: 21,
  engagement_freq: 0.42,
  days_since_last: 3,
  goal_age_days: 35,
  pomodoro_sessions: 1,
  pomodoro_completion_rate: 0.35,
};

function getColor(risk) {
  if (!risk) return "bg-gray-100 text-gray-700";
  if (risk.includes("High")) return "bg-red-100 text-red-700";
  if (risk.includes("Medium")) return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-700";
}

export default function ClientACaseStudy() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!open || data) return;

    async function load() {
      try {
        const res = await predictClientA(payload);
        setData(res);
      } catch (e) {
        console.error(e);
      }
    }

    load();
  }, [open, data]);

  return (
    <div className="mt-10 border rounded-2xl bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 text-left flex justify-between items-center"
      >
        <div>
          <p className="text-sm text-indigo-600 font-semibold">
            Case Example
          </p>
          <h2 className="text-2xl font-bold">
            Client A Model Comparison
          </h2>
        </div>
        <span className="text-2xl">{open ? "-" : "+"}</span>
      </button>

      {open && (
        <div className="px-6 pb-6">
          {!data && <p>Loading model predictions...</p>}

          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {data.models.map((m) => (
                <div
                  key={m.model}
                  className="border rounded-xl p-4 bg-slate-50"
                >
                  <h3 className="font-bold text-lg">{m.model}</h3>
                  <p className="text-sm text-gray-500">{m.dataset}</p>

                  <div className="mt-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${getColor(
                        m.prediction
                      )}`}
                    >
                      {m.prediction}
                    </span>
                  </div>

                  <p className="mt-3 text-xl font-bold">
                    {m.confidence ? `${m.confidence}%` : "N/A"}
                  </p>

                  {m.activity_prediction && (
                    <p className="text-sm mt-2">
                      Activity: {m.activity_prediction}
                    </p>
                  )}

                  <p className="text-xs text-gray-500 mt-3">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}