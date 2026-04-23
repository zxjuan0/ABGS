import { useEffect, useState } from "react";
import { getPrediction } from "../services/api";
import RiskBadge from "../components/RiskBadge";
import Goalcard from "../components/Goalcard";
import WeeklyChart from "../components/WeeklyChart";
import InsightsPanel from "../components/InsightsPanel";

export default function Dashboard() {
  const [prediction, setPrediction] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(true);
  const [predictionError, setPredictionError] = useState("");

  const goals = [
    {
      title: "Workout",
      streak: 7,
      progressLabel: "23% of 30-day goal",
      progressValue: 23,
    },
    {
      title: "Study AI",
      streak: 12,
      progressLabel: "20% of 60-day goal",
      progressValue: 20,
    },
    {
      title: "Meditation",
      streak: 4,
      progressLabel: "40% of 10-day goal",
      progressValue: 40,
    },
  ];

  const weeklyData = [
    { day: "Mon", value: 1 },
    { day: "Tue", value: 3 },
    { day: "Wed", value: 4 },
    { day: "Thu", value: 4 },
    { day: "Fri", value: 6 },
    { day: "Sat", value: 7 },
    { day: "Sun", value: 7 },
  ];

  useEffect(() => {
    async function loadPrediction() {
      try {
        const payload = {
          streak_length: 7,
          missed_days_last_7: 2,
          checkin_hour_avg: 18,
          engagement_freq: 0.65,
          days_since_last: 1,
          goal_age_days: 30,
        };

        const data = await getPrediction(payload);
        setPrediction(data);
      } catch (error) {
        console.error("Prediction error:", error);
        setPredictionError("Could not load ML prediction.");
      } finally {
        setLoadingPrediction(false);
      }
    }

    loadPrediction();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-2">Adaptive Goal System & Live Insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {goals.map((goal, index) => (
            <Goalcard
              key={index}
              title={goal.title}
              streak={goal.streak}
              progressLabel={goal.progressLabel}
              progressValue={goal.progressValue}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">ML Risk Prediction</h2>
            {prediction && <RiskBadge risk={prediction.dropout_probability} />}
          </div>

          {loadingPrediction && (
            <p className="text-slate-500">Loading prediction...</p>
          )}

          {predictionError && (
            <p className="text-red-600">{predictionError}</p>
          )}

          {prediction && (
            <div className="space-y-3">
              <p className="text-slate-700">
                <span className="font-semibold">Dropout Probability:</span>{" "}
                {Math.round(prediction.dropout_probability * 100)}%
              </p>
              <p className="text-slate-700">
                <span className="font-semibold">Risk Level:</span>{" "}
                {prediction.risk_level}
              </p>
              <p className="text-slate-600">
                This prediction is generated from behavioral features such as streak length,
                missed days, engagement frequency, and time since last check-in.
              </p>
            </div>
          )}
        </div>

        <div className="mb-8">
          <WeeklyChart data={weeklyData} />
        </div>

        <div>
          <InsightsPanel prediction={prediction} />
        </div>
      </div>
    </div>
  );
}