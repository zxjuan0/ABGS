export default function InsightsPanel({ prediction }) {
  function getInsightContent() {
    if (!prediction) {
      return {
        title: "Behavior Insight",
        message: "Prediction data is not available yet.",
        recommendation: "Try running the backend and refreshing the dashboard.",
      };
    }

    const probability = prediction.dropout_probability;

    if (probability > 0.65) {
      return {
        title: "High Risk Detected",
        message:
          "The current behavior pattern suggests a strong chance of dropping off soon.",
        recommendation:
          "Reduce goal intensity, send a reminder, or encourage a smaller next action.",
      };
    }

    if (probability > 0.35) {
      return {
        title: "Moderate Risk Detected",
        message: "Some inconsistency is showing in recent behavior patterns.",
        recommendation:
          "A lighter check-in or shorter task tomorrow may help restore momentum.",
      };
    }

    return {
      title: "Low Risk Detected",
      message: "The current pattern appears stable and consistent.",
      recommendation:
        "Maintain the current routine and continue reinforcing streak behavior.",
    };
  }

  const insight = getInsightContent();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">
        Adaptive Insights
      </h2>

      <div className="space-y-3">
        <p className="text-slate-800 font-semibold">{insight.title}</p>
        <p className="text-slate-600">{insight.message}</p>
        <p className="text-slate-600">
          <span className="font-semibold">Recommendation:</span>{" "}
          {insight.recommendation}
        </p>
      </div>
    </div>
  );
}