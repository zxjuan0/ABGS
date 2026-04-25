import { useEffect, useState } from "react";
import { getPrediction, predictClientA } from "../services/api";

const modelPerformance = [
  {
    name: "Model 1",
    title: "Small Dataset Model",
    dataset: "200 Records",
    key: "model_200",
    accuracy: "100.00%",
    precision: "0.00%",
    recall: "0.00%",
    f1: "0.00%",
    f1Value: 0,
    note: "The accuracy looks perfect, but the test split did not include high-risk cases. This makes the result unreliable for dropout prediction.",
  },
  {
    name: "Model 2",
    title: "Medium Dataset Model",
    dataset: "20,000 Records",
    key: "model_20k",
    accuracy: "99.75%",
    precision: "100.00%",
    recall: "72.22%",
    f1: "83.87%",
    f1Value: 83.87,
    note: "The model begins identifying risk cases more effectively as the dataset size increases.",
  },
  {
    name: "Model 3",
    title: "Large Dataset Model",
    dataset: "200,000 Records",
    key: "model_200k",
    accuracy: "99.90%",
    precision: "96.93%",
    recall: "90.16%",
    f1: "93.42%",
    f1Value: 93.42,
    note: "This model shows the strongest balance between identifying risk cases and avoiding false alarms.",
  },
  {
    name: "Model 4",
    title: "ABGS Structured Model",
    dataset: "Habit-Aware Dataset",
    key: "model_4",
    accuracy: "99.29%",
    precision: "99.68%",
    recall: "94.87%",
    f1: "97.21%",
    f1Value: 97.21,
    note: "This model adds habit type, activity type, difficulty, and Pomodoro behavior to support more specific interpretation.",
  },
];

const featureImportance = [
  { feature: "Engagement Frequency", value: 24.23 },
  { feature: "Days Since Last Check-In", value: 24.17 },
  { feature: "Streak Length", value: 20.47 },
  { feature: "Missed Days Last 7", value: 17.06 },
  { feature: "Goal Age Days", value: 7.71 },
  { feature: "Check-In Hour Avg", value: 6.37 },
];

const clientAPayload = {
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

const clientTimeline = [
  { day: 1, engagement: 86, risk: "Low", note: "Consistent study routine" },
  { day: 2, engagement: 88, risk: "Low", note: "Strong follow-through" },
  { day: 3, engagement: 84, risk: "Low", note: "Stable engagement" },
  { day: 4, engagement: 72, risk: "Medium", note: "Small decline detected" },
  { day: 5, engagement: 58, risk: "Medium", note: "Early risk signal" },
  { day: 6, engagement: 42, risk: "High", note: "Drop-off alert triggered" },
  { day: 7, engagement: 61, risk: "Medium", note: "Recovery begins" },
  { day: 8, engagement: 74, risk: "Low", note: "Back on track" },
];

const clientHabits = [
  {
    habit: "Studying",
    type: "Screen-based",
    streak: 8,
    missed: "4 / 7",
    risk: "High",
    suggestion: "Use shorter Pomodoro blocks and reduce task size temporarily.",
  },
  {
    habit: "Hydration",
    type: "Self-care",
    streak: 13,
    missed: "1 / 7",
    risk: "Low",
    suggestion: "Maintain the current routine.",
  },
  {
    habit: "Exercise",
    type: "Outdoor",
    streak: 4,
    missed: "4 / 7",
    risk: "High",
    suggestion: "Switch to a lower-effort indoor option until consistency improves.",
  },
  {
    habit: "Journaling",
    type: "Self-care",
    streak: 6,
    missed: "2 / 7",
    risk: "Medium",
    suggestion: "Attach journaling to an existing bedtime routine.",
  },
];

export default function Dashboard() {
  const [prediction, setPrediction] = useState(null);
  const [clientPrediction, setClientPrediction] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(true);
  const [loadingClient, setLoadingClient] = useState(false);
  const [predictionError, setPredictionError] = useState("");
  const [clientError, setClientError] = useState("");
  const [clientOpen, setClientOpen] = useState(false);

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
        setPredictionError("Could not load prediction.");
      } finally {
        setLoadingPrediction(false);
      }
    }

    loadPrediction();
  }, []);

  useEffect(() => {
    if (!clientOpen || clientPrediction) return;

    async function loadClientPrediction() {
      try {
        setLoadingClient(true);
        setClientError("");
        const data = await predictClientA(clientAPayload);
        setClientPrediction(data);
      } catch (error) {
        console.error("Client A prediction error:", error);
        setClientError("Could not load Client A predictions. Make sure the backend is running.");
      } finally {
        setLoadingClient(false);
      }
    }

    loadClientPrediction();
  }, [clientOpen, clientPrediction]);

  const getRiskColor = (risk) => {
    if (!risk) return "text-slate-600 bg-slate-50 border-slate-200";
    const normalized = risk.toLowerCase();

    if (normalized.includes("high")) return "text-red-600 bg-red-50 border-red-200";
    if (normalized.includes("medium")) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getModelPrediction = (key) => {
    if (!prediction) return null;
    return prediction[key] || null;
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <p className="text-sm font-semibold text-indigo-600 mb-2">
            Adaptive Behavior Goal System
          </p>
          <h1 className="text-4xl font-bold text-slate-900">
            Model Performance Dashboard
          </h1>
          <p className="text-slate-500 mt-3 max-w-4xl">
            ABGS uses synthetic behavioral data to test how dataset size and data structure affect dropout-risk prediction. The goal is not only to predict risk, but to make those predictions easier to interpret and connect back to user behavior.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-8">
          <SummaryCard
            title="Models Tested"
            value="4"
            text="Three dataset-size models plus one structured ABGS model."
          />
          <SummaryCard
            title="Dataset Scale"
            value="200 to 200K"
            text="Synthetic records were scaled to test performance changes."
          />
          <SummaryCard
            title="Model Type"
            value="Random Forest"
            text="A classifier predicts whether a user is at risk of dropping off."
          />
          <SummaryCard
            title="Primary Metric"
            value="F1 Score"
            text="F1 balances precision and recall, which is important when risk cases are less common."
          />
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Four-Model Comparison
              </h2>
              <p className="text-slate-500 mt-1 max-w-4xl">
                Accuracy can be misleading when high-risk cases are rare. Precision shows how often risk predictions are correct, recall shows how many risk cases are found, and F1 score balances both. For this project, F1 is the clearest comparison metric because the goal is to detect risk without relying on accuracy alone.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
              Simulation Study
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-5">
            {modelPerformance.map((model) => {
              const livePrediction = getModelPrediction(model.key);

              return (
                <div
                  key={model.key}
                  className="rounded-2xl border border-slate-200 p-5 bg-slate-50"
                >
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-indigo-600">
                      {model.dataset}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900">
                      {model.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <Metric label="Accuracy" value={model.accuracy} />
                    <Metric label="Precision" value={model.precision} />
                    <Metric label="Recall" value={model.recall} />
                    <Metric label="F1 Score" value={model.f1} />
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-sm font-semibold text-slate-800 mb-2">
                      Baseline Prediction
                    </p>

                    {loadingPrediction && (
                      <p className="text-sm text-slate-500">Loading prediction...</p>
                    )}

                    {predictionError && (
                      <p className="text-sm text-red-600">{predictionError}</p>
                    )}

                    {livePrediction && (
                      <div className="space-y-2">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(
                            livePrediction.risk
                          )}`}
                        >
                          {livePrediction.risk.toUpperCase()} RISK
                        </span>

                        <p className="text-sm text-slate-700">
                          Dropout Probability:{" "}
                          <span className="font-semibold">
                            {(livePrediction.probability * 100).toFixed(1)}%
                          </span>
                        </p>
                      </div>
                    )}

                    {model.key === "model_4" && (
                      <p className="text-sm text-slate-500">
                        Model 4 prediction appears in the Client A case example.
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-slate-500 mt-4">{model.note}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              F1 Score by Model
            </h2>
            <p className="text-slate-500 mb-6">
              The F1 trend shows how model quality changes as the data becomes larger or more structured.
            </p>
            <SimpleBarChart data={modelPerformance} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Main Finding
            </h2>
            <p className="text-slate-600 mb-4">
              More data improved prediction quality, especially when moving from the small dataset to the larger synthetic datasets.
            </p>
            <p className="text-slate-600 mb-4">
              The structured ABGS model goes one step further by connecting predictions to habit-specific context, making the output more useful for explanation and adaptive feedback.
            </p>
            <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-4">
              <p className="text-sm font-semibold text-indigo-900">
                Key takeaway
              </p>
              <p className="text-sm text-indigo-800 mt-1">
                Dataset size helps performance, but better data structure helps interpretation.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Feature Importance
          </h2>
          <p className="text-slate-500 mb-6">
            The strongest signals were tied to consistency and recency, which supports the idea that dropout risk is closely connected to recent engagement patterns.
          </p>

          <div className="space-y-4">
            {featureImportance.map((item) => (
              <div key={item.feature}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">
                    {item.feature}
                  </span>
                  <span className="text-slate-500">{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <button
            onClick={() => setClientOpen(!clientOpen)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition"
          >
            <div>
              <p className="text-sm uppercase tracking-wide text-indigo-600 font-semibold">
                Case Example
              </p>
              <h2 className="text-2xl font-bold text-slate-900">
                Client A
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Expand to view habit history, model predictions, trend changes, and adaptive support suggestions.
              </p>
            </div>

            <span className="text-3xl text-slate-400">
              {clientOpen ? "−" : "+"}
            </span>
          </button>

          {clientOpen && (
            <div className="px-6 pb-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <SummaryCard title="Client" value="Client A" text="Simulated demo user." />
                <SummaryCard title="Tracked Habits" value="4" text="Studying, hydration, exercise, journaling." />
                <SummaryCard title="Current Focus" value="Studying" text="Screen-based, medium difficulty." />
                <SummaryCard title="Recent Missed Days" value="4 / 7" text="Recent inactivity increased risk." />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Model Predictions for Client A
                </h3>

                {loadingClient && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                    Loading predictions from backend models...
                  </div>
                )}

                {clientError && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                    {clientError}
                  </div>
                )}

                {clientPrediction && (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {clientPrediction.models.map((model) => (
                      <div
                        key={model.model}
                        className="rounded-2xl border border-slate-200 p-5 bg-slate-50"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-lg font-bold text-slate-900">
                              {model.model}
                            </h4>
                            <p className="text-sm text-slate-500">{model.dataset}</p>
                            <p className="text-sm text-slate-500">{model.type}</p>
                          </div>

                          <span
                            className={`text-xs px-3 py-1 rounded-full border whitespace-nowrap ${getRiskColor(
                              model.prediction
                            )}`}
                          >
                            {model.prediction}
                          </span>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm text-slate-500">Confidence</p>
                          <p className="text-3xl font-bold text-slate-900">
                            {model.confidence ? `${model.confidence}%` : "N/A"}
                          </p>
                        </div>

                        {model.activity_prediction && (
                          <div className="mt-4">
                            <p className="text-sm text-slate-500">
                              Activity-Specific Risk
                            </p>
                            <span
                              className={`inline-block mt-1 text-xs px-3 py-1 rounded-full border ${getRiskColor(
                                model.activity_prediction
                              )}`}
                            >
                              {model.activity_prediction}
                            </span>
                          </div>
                        )}

                        <p className="text-sm text-slate-600 mt-4">
                          {model.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Engagement Trend
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Client A moves from stable engagement to a risk spike, then begins recovering.
                  </p>
                  <LineTrend data={clientTimeline} />
                </div>

                <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Alert Timeline
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    The timeline shows when behavior begins shifting enough to require support.
                  </p>

                  <div className="space-y-3">
                    {clientTimeline.map((row) => (
                      <div
                        key={row.day}
                        className="flex items-center justify-between gap-4 rounded-xl bg-white border border-slate-200 p-3"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">
                            Day {row.day}
                          </p>
                          <p className="text-sm text-slate-500">{row.note}</p>
                        </div>

                        <span
                          className={`text-xs px-3 py-1 rounded-full border ${getRiskColor(
                            row.risk
                          )}`}
                        >
                          {row.risk}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Habit-Level Breakdown
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clientHabits.map((habit) => (
                    <div
                      key={habit.habit}
                      className="rounded-2xl border border-slate-200 p-5 bg-slate-50"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">
                            {habit.habit}
                          </h4>
                          <p className="text-sm text-slate-500">{habit.type}</p>
                          <p className="text-sm text-slate-500 mt-1">
                            Streak: {habit.streak} days · Missed: {habit.missed}
                          </p>
                        </div>

                        <span
                          className={`text-xs px-3 py-1 rounded-full border ${getRiskColor(
                            habit.risk
                          )}`}
                        >
                          {habit.risk}
                        </span>
                      </div>

                      <p className="text-sm text-slate-700 mt-4">
                        <strong>Adaptive suggestion:</strong> {habit.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-5">
                <h3 className="text-lg font-semibold text-indigo-950">
                  What Client A demonstrates
                </h3>

                <p className="text-sm text-indigo-900 mt-2">
                  Client A is simulated, but the prediction cards are generated through backend calls to trained models.
                </p>

                <p className="text-sm text-indigo-900 mt-3">
                  The case shows that risk is not just a yes-or-no outcome. It changes over time as engagement, missed days, and habit context shift.
                </p>

                <p className="text-sm text-indigo-900 mt-3">
                  ABGS is designed to support adaptive behavior by identifying early signals of disengagement and suggesting practical adjustments before a habit fully drops off.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, text }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className="text-2xl font-bold text-slate-900 mt-1">{value}</h2>
      <p className="text-slate-600 mt-3">{text}</p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}

function SimpleBarChart({ data }) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.name}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700">
              {item.name}: {item.dataset}
            </span>
            <span className="text-slate-500">{item.f1}</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${item.f1Value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function LineTrend({ data }) {
  const max = 100;
  const width = 560;
  const height = 220;
  const padding = 28;

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - (item.engagement / max) * (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[480px]">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#cbd5e1" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#cbd5e1" />

        <polyline
          fill="none"
          stroke="#6366f1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points.join(" ")}
        />

        {data.map((item, index) => {
          const x = padding + (index / (data.length - 1)) * (width - padding * 2);
          const y = height - padding - (item.engagement / max) * (height - padding * 2);

          return (
            <g key={item.day}>
              <circle cx={x} cy={y} r="6" fill="#4f46e5" />
              <text x={x} y={height - 6} textAnchor="middle" fontSize="11" fill="#64748b">
                D{item.day}
              </text>
              <text x={x} y={y - 12} textAnchor="middle" fontSize="11" fill="#334155">
                {item.engagement}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}