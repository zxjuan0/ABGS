import {
LineChart, Line, XAxis, YAxis, Tooltip,
CartesianGrid, ResponsiveContainer
} from 'recharts';
const MOCK_DATA = [
{ day: 'Mon', streak: 1, target: 5 },
{ day: 'Tue', streak: 3, target: 5 },
{ day: 'Wed', streak: 4, target: 5 },
{ day: 'Thu', streak: 4, target: 5 },
{ day: 'Fri', streak: 6, target: 5 },
{ day: 'Sat', streak: 7, target: 5 },
{ day: 'Sun', streak: 7, target: 5 },
];
export default function WeeklyChart() {
return (
<div className='card'>
<h2 className='text-lg font-semibold mb-4'>Weekly Streak Trend</h2>
<ResponsiveContainer width='100%' height={240}>
<LineChart data={MOCK_DATA}>
<CartesianGrid strokeDasharray='3 3' stroke='#F3F4F6' />
<XAxis dataKey='day' tick={{ fontSize: 12 }} />
<YAxis tick={{ fontSize: 12 }} />
<Tooltip />
<Line
type='monotone' dataKey='streak'
stroke='#4F46E5' strokeWidth={2} dot={{ r: 4 }}
/>
<Line
type='monotone' dataKey='target'
stroke='#E5E7EB' strokeWidth={1.5}
strokeDasharray='4 4' dot={false}
/>
</LineChart>
</ResponsiveContainer>
</div>
);
}