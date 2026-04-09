import { useEffect, useState } from 'react';
import { getPrediction, getGoals } from '../services/api';
import GoalCard from '../components/GoalCard';
import InsightsPanel from '../components/InsightsPanel';
import WeeklyChart from '../components/WeeklyChart';
const MOCK_GOALS = [
{ id: 1, title: 'Workout', streak: 7, target: 30 },
{ id: 2, title: 'Study AI', streak: 12, target: 60 },
{ id: 3, title: 'Meditation', streak: 4, target: 10 },
];
export default function Dashboard() {
const [goals, setGoals] = useState(MOCK_GOALS);
const [prediction, setPrediction] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
Promise.all([
getGoals().catch(() => MOCK_GOALS),
getPrediction({ streak: 7, missed_days: 2, engagement_score: 75 })
])
.then(([goalsData, predData]) => {
setGoals(goalsData);
setPrediction(predData);
})
.finally(() => setLoading(false));
}, []);
if (loading) return (
<div className='flex items-center justify-center h-64'>
<p className='text-gray-400 animate-pulse'>Loading insights...</p>
</div>
);
return (
<div className='max-w-5xl mx-auto px-4 py-8 space-y-8'>
<div>
<h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
<p className='text-gray-500 mt-1'>Adaptive goal system — live insights</p>
</div>
<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
{goals.map((g) => <GoalCard key={g.id} goal={g} />)}
</div>
{prediction && <InsightsPanel prediction={prediction} />}
<WeeklyChart />
</div>
);
}