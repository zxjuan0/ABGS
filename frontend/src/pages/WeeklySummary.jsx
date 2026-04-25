export default function WeeklySummary() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-indigo-600 mb-2">
          ABGS Summary
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Weekly Summary & Model Context
        </h1>
        <p className="text-slate-500 mt-3 max-w-3xl">
          This page explains how ABGS interprets weekly behavior, how the
          structured dataset was generated, and why Model 4 provides more
          behavior-aware predictions.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <SummaryCard
          title="Behavior Tracked"
          value="Consistency"
          text="ABGS looks at streaks, missed days, engagement frequency, and recent check-ins."
        />
        <SummaryCard
          title="Dataset Type"
          value="Synthetic"
          text="The data is simulated to test model behavior in a controlled environment."
        />
        <SummaryCard
          title="Model Focus"
          value="Adaptive Risk"
          text="The system predicts dropout risk and connects it back to behavior patterns."
        />
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          How ABGS Generates Structured Behavioral Data
        </h2>

        <p className="text-slate-600 mb-4">
          The ABGS dataset was designed as a simulation study. Instead of using
          real user data, the system generates synthetic behavior records that
          represent realistic habit-tracking patterns. This allows the project
          to test how machine learning models respond to different data sizes
          and richer behavioral features.
        </p>

        <p className="text-slate-600">
          Model 4 improves on the earlier datasets by adding structure around
          the type of habit being tracked, the context of the activity, and the
          difficulty of maintaining the behavior.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <InfoBlock
          title="Habit Type"
          items={[
            "Studying",
            "Hydration",
            "Exercise",
            "Journaling",
            "Sleep",
          ]}
          text="Habit type helps the model understand that different behaviors have different patterns of consistency and drop-off."
        />

        <InfoBlock
          title="Activity Context"
          items={[
            "Indoor",
            "Outdoor",
            "Screen-based",
            "Self-care",
          ]}
          text="Activity context gives the model more information about the environment or setting where the behavior happens."
        />

        <InfoBlock
          title="Difficulty Level"
          items={[
            "Low difficulty",
            "Medium difficulty",
            "High difficulty",
          ]}
          text="Difficulty helps explain why some habits are easier to maintain while others may lead to higher risk of disengagement."
        />

        <InfoBlock
          title="Pomodoro Features"
          items={[
            "Pomodoro sessions",
            "Pomodoro completion rate",
          ]}
          text="For studying habits, Pomodoro features help capture focus behavior and task completion patterns."
        />
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          What Model 4 Adds
        </h2>

        <p className="text-slate-600 mb-4">
          Models 1–3 use the same basic behavioral features, such as streak
          length, missed days, engagement frequency, and days since last check-in.
          These models are useful for testing whether more data improves
          prediction performance.
        </p>

        <p className="text-slate-600 mb-4">
          Model 4 adds a richer ABGS structure. It does not only ask whether a
          user is at risk. It also considers what kind of behavior is being
          tracked and what context may be affecting that behavior.
        </p>

        <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-4">
          <p className="text-sm font-semibold text-indigo-900">
            Key idea
          </p>
          <p className="text-sm text-indigo-800 mt-1">
            More data improves performance, but better data structure improves
            interpretation.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Weekly Interpretation
        </h2>

        <p className="text-slate-600 mb-4">
          In a weekly summary, ABGS would look for changes in consistency, recent
          missed activity, engagement decline, and recovery patterns. The goal is
          not to shame the user, but to identify early signs that a habit may
          need support.
        </p>

        <p className="text-slate-600">
          For example, if a user misses several study sessions and their
          engagement drops, ABGS can flag the pattern and suggest a smaller,
          more achievable adjustment, such as reducing the task size or using
          shorter focus blocks.
        </p>
      </section>
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

function InfoBlock({ title, items, text }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100"
          >
            {item}
          </span>
        ))}
      </div>

      <p className="text-slate-600">{text}</p>
    </div>
  );
}