import { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { logCheckIn } from '../services/api';
const GOALS = [
{ id: 1, title: 'Workout' },
{ id: 2, title: 'Study AI' },
{ id: 3, title: 'Meditation' },
];
export default function CheckIn() {
const [completed, setCompleted] = useState({});
const [submitted, setSubmitted] = useState(false);
const toggle = (id) =>
setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
const handleSubmit = async () => {
const ids = Object.entries(completed)
.filter(([, v]) => v).map(([k]) => Number(k));
await Promise.allSettled(ids.map(logCheckIn));
setSubmitted(true);
};
return (
<div className='min-h-screen flex items-center justify-center px-4'>
<div className='card w-full max-w-sm'>
{submitted ? (
<div className='text-center py-8'>
<CheckCircle className='w-12 h-12 text-green-500 mx-auto mb-3' />
<h2 className='text-xl font-bold'>Logged!</h2>
<p className='text-gray-500 mt-1'>Great work. See you tomorrow.</p>
</div>
) : (
<>
<h1 className='text-2xl font-bold mb-1'>Daily Check-In</h1>
<p className='text-gray-400 text-sm mb-6'>
Tap each goal you completed today
</p>
<div className='space-y-3 mb-6'>
{GOALS.map((g) => (
<button key={g.id} onClick={() => toggle(g.id)}
className={`w-full flex items-center gap-3 p-4 rounded-xl border
${completed[g.id]
? 'border-brand-500 bg-brand-50 text-brand-700'
: 'border-gray-200 hover:border-gray-300'}`}>
{completed[g.id]
? <CheckCircle className='w-5 h-5 text-brand-500' />
: <Circle className='w-5 h-5 text-gray-300' />}
<span className='font-medium'>{g.title}</span>
</button>
))}
</div>
<button onClick={handleSubmit}
disabled={!Object.values(completed).some(Boolean)}
className='w-full bg-brand-500 hover:bg-brand-600
disabled:opacity-40 text-white font-semibold py-3 rounded-xl'>
Submit Check-In
</button>
</>
)}
</div>
</div>
);
}