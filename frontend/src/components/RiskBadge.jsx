export default function RiskBadge({ risk }) {
const level = risk > 0.65 ? 'High' : risk > 0.35 ? 'Medium' : 'Low';
const styles = {
High: 'bg-red-50 text-red-600 border-red-200',
Medium: 'bg-amber-50 text-amber-600 border-amber-200',
Low: 'bg-green-50 text-green-600 border-green-200',
};
return (
<span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${styles
[level]}`}>
{level} Risk
</span>
);
}
