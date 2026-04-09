import WeeklyChart from '../components/WeeklyChart';
export default function WeeklySummary() {
return (
<div className='max-w-5xl mx-auto px-4 py-8'>
<h1 className='text-3xl font-bold mb-6'>Weekly Summary</h1>
<WeeklyChart />
</div>
);
}