import { useEffect, useState } from "react";
import { getPrediction } from "../services/api";

export default function Dashboard() {
  const [prediction, setPrediction] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(true);
  const [predictionError, setPredictionError] = useState("");

  const modelPerformance = [
    {
      name: "Small Model",
      dataset: "200 Records",
      key: "model_200",
      accuracy: "95.00%",
      precision: "0.00%",
      recall: "0.00%",
      f1: "0.00%",
      note: "High accuracy, but failed to identify dropout cases.",
    },
    {
      name: "Medium Model",
      dataset: "20,000 Records",
      key: "model_20k",
      accuracy: "99.55%",
      precision: "94.44%",
      recall: "50.00%",
      f1: "65.38%",
      note: "Improved precision, but still missed some at-risk cases.",
    },
    {
      name: "Large Model",
      dataset: "200,000 Records",
      key: "model_200k",
      accuracy: "99.91%",
      precision: "97.49%",
      recall: "90.07%",
      f1: "93.63%",
      note: "Strongest balance between precision, recall, and F1-score.",
    },
  ];

  const featureImportance = [
    { feature: "Engagement Frequency", value: "24.23%" },
    { feature: "Days Since Last Check-In", value: "24.17%" },
    { feature: "Streak Length", value: "20.47%" },
    { feature: "Missed Days Last 7", value: "17.06%" },
    { feature: "Goal Age Days", value: "7.71%" },
    { feature: "Check-In Hour Avg", value: "6.37%" },
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

  const getRiskColor = (risk) => {
    if (risk === "high") return "text-red-600 bg-red-50 border-red-200";
    if (risk === "medium") return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getModelPrediction = (key) => {
    if (!prediction) return null;
    return prediction[key] || null;
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-sm font-semibold text-indigo-600 mb-2">
            Adaptive Goal System Using Synthetic Data
          </p>
          <h1 className="text-4xl font-bold text-slate-900">
            Model Performance Dashboard
          </h1>
          <p className="text-slate-500 mt-3 max-w-3xl">
            ABGS compares machine learning models trained on synthetic datasets
            of different sizes to explore how record volume impacts prediction
            quality, habit-risk detection, and decision support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-500">Experiment</p>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              3 Dataset Sizes
            </h2>
            <p className="text-slate-600 mt-3">
              Small, medium, and large synthetic datasets were used to train
              separate models and compare performance.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-500">Model Type</p>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Random Forest
            </h2>
            <p className="text-slate-600 mt-3">
              Each model predicts dropout risk using the same behavioral
              features, making the comparison consistent.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <p className="text-sm text-slate-500">Research Question</p>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Does More Data Help?
            </h2>
            <p className="text-slate-600 mt-3">
              The goal is not to assume more data is always better, but to study
              where additional synthetic records improve model reliability.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Model Comparison
              </h2>
              <p className="text-slate-500 mt-1">
                Performance metrics from models trained on synthetic datasets of
                increasing size.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
              Simulation Study
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
                      {model.name}
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
                      Live Prediction
                    </p>

                    {loadingPrediction && (
                      <p className="text-sm text-slate-500">
                        Loading prediction...
                      </p>
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
                  </div>

                  <p className="text-sm text-slate-500 mt-4">{model.note}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Key Finding
            </h2>
            <p className="text-slate-600 mb-4">
              The 200-row model achieved high accuracy, but failed to identify
              dropout cases. This shows why accuracy alone can be misleading,
              especially when a dataset is small or imbalanced.
            </p>
            <p className="text-slate-600">
              As dataset size increased, recall and F1-score improved, showing
              that larger synthetic datasets helped the model capture more
              meaningful behavioral patterns.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Business Insight
            </h2>
            <p className="text-slate-600 mb-4">
              This comparison helps answer a practical question: how much data
              is enough before model performance becomes useful for decision
              making?
            </p>
            <p className="text-slate-600">
              In a business context, this matters because generating, storing,
              or collecting more data has a cost. ABGS helps explore when more
              records improve predictive value and when additional data may
              produce diminishing returns.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Feature Importance From Best Performing Model
          </h2>
          <p className="text-slate-500 mb-6">
            The 200K-record model showed the strongest balance across metrics.
            Its feature importance suggests that engagement frequency, recency,
            and streak behavior are the strongest signals for dropout risk.
          </p>

          <div className="space-y-4">
            {featureImportance.map((item) => (
              <div key={item.feature}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-slate-700">
                    {item.feature}
                  </span>
                  <span className="text-slate-500">{item.value}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: item.value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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