"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// Sample static data for placeholder chart
const sampleData = [
  { hour: '00:00', value: 120 },
  { hour: '01:00', value: 110 },
  { hour: '02:00', value: 130 },
  { hour: '03:00', value: 115 },
  { hour: '04:00', value: 140 },
  { hour: '05:00', value: 150 },
  { hour: '06:00', value: 160 },
  { hour: '07:00', value: 170 },
  { hour: '08:00', value: 180 },
  { hour: '09:00', value: 190 },
  { hour: '10:00', value: 200 },
  { hour: '11:00', value: 210 },
];

export default function GenerationChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={sampleData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
