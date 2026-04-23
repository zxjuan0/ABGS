export default function Goalcard({ title, streak, progressLabel, progressValue }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <span className="text-orange-500 text-lg">◔</span>
      </div>

      <div className="mb-3">
        <span className="text-4xl font-bold text-slate-900">{streak}</span>
        <span className="ml-2 text-slate-500">day streak</span>
      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-indigo-500 rounded-full"
          style={{ width: `${progressValue}%` }}
        />
      </div>

      <p className="text-sm text-slate-500">{progressLabel}</p>
    </div>
  );
}