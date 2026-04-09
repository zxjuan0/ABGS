import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, BarChart2 } from 'lucide-react';
const links = [
{ to: '/', label: 'Dashboard', Icon: LayoutDashboard },
{ to: '/checkin', label: 'Check-In', Icon: CheckSquare },
{ to: '/summary', label: 'Summary', Icon: BarChart2 },
];
export default function Navbar() {
return (
<nav className='bg-white border-b border-gray-100 sticky top-0 z-10'>
<div className='max-w-5xl mx-auto px-4 h-14 flex items-center justify-between'
>
<span className='font-bold text-brand-600 text-lg tracking-tight'>ABGS</span
>
<div className='flex gap-1'>
{links.map(({ to, label, Icon }) => (
<NavLink
key={to} to={to}
className={({ isActive }) =>
`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-mediu
m
${isActive
? 'bg-brand-50 text-brand-600'
: 'text-gray-500 hover:text-gray-700'}`
}
>
<Icon className='w-4 h-4' />
{label}
</NavLink>
))}
</div>
</div>
</nav>
);
}