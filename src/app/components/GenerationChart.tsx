import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Placeholder data – replace with real ENTSO‑E API data later
const data = [
  { hour: "00:00", value: 120 },
  { hour: "01:00", value: 98 },
  { hour: "02:00", value: 86 },
  { hour: "03:00", value: 95 },
  { hour: "04:00", value: 110 },
  { hour: "05:00", value: 130 },
  { hour: "06:00", value: 150 },
  { hour: "07:00", value: 165 },
  { hour: "08:00", value: 180 },
  { hour: "09:00", value: 200 },
  { hour: "10:00", value: 190 },
  { hour: "11:00", value: 175 },
];

const GenerationChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GenerationChart;
