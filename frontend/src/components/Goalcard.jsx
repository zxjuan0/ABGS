import { Flame } from 'lucide-react';
export default function GoalCard({ goal }) {
const { title, streak, target } = goal;
const pct = Math.min((streak / target) * 100, 100).toFixed(0);
return (
<div className='card hover:shadow-md cursor-pointer group'>
<div className='flex items-center justify-between mb-3'>
<h3 className='font-semibold text-gray-800'>{title}</h3>
<Flame className='w-4 h-4 text-orange-400' />
</div>
<p className='text-2xl font-bold text-gray-900'>{streak}
<span className='text-sm font-normal text-gray-400 ml-1'>day streak</span>
</p>
{/* Progress bar */}
<div className='mt-3 bg-gray-100 rounded-full h-1.5'>
<div
className='bg-brand-500 h-1.5 rounded-full transition-all duration-500'
style={{ width: `${pct}%` }}
/>
</div>
<p className='text-xs text-gray-400 mt-1'>{pct}% of {target}-day goal</p>
</div>
);
}