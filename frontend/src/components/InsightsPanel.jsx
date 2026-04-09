import RiskBadge from './RiskBadge';
import { Brain } from 'lucide-react';
const INTERVENTIONS = {
High: 'Reduce daily target by 20% and add a streak-save reminder.',
Medium: 'Send a motivational nudge. Consider a 2-day streak protection.',
Low: 'On track. Increase challenge level to maintain engagement.',
};
export default function InsightsPanel({ prediction }) {
const risk = prediction.dropout_probability ?? 0;
const level = risk > 0.65 ? 'High' : risk > 0.35 ? 'Medium' : 'Low';
const pct = (risk * 100).toFixed(1);
return (
<div className='card'>
<div className='flex items-center gap-2 mb-4'>
<Brain className='w-5 h-5 text-brand-500' />
<h2 className='text-lg font-semibold'>AI Insights</h2>
<div className='ml-auto'><RiskBadge risk={risk} /></div>
</div>
<div className='grid sm:grid-cols-2 gap-4'>
<div className='bg-gray-50 rounded-xl p-4'>
<p className='text-xs text-gray-400 mb-1'>Dropout Probability</p>
<p className='text-3xl font-bold text-gray-900'>{pct}%</p>
</div>
<div className='bg-gray-50 rounded-xl p-4'>
<p className='text-xs text-gray-400 mb-1'>Recommended Action</p>
<p className='text-sm text-gray-700'>{INTERVENTIONS[level]}</p>
</div>
</div>
</div>
);
}