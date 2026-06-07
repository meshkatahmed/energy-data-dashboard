"use client";
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { fetchGeneration, GenerationData } from '@/services/entsoe';

// Sample static data for placeholder chart
const sampleData: GenerationData[] = [
  { datetime: '00:00', value: 120 },
  { datetime: '01:00', value: 110 },
  { datetime: '02:00', value: 130 },
  { datetime: '03:00', value: 115 },
  { datetime: '04:00', value: 140 },
  { datetime: '05:00', value: 150 },
  { datetime: '06:00', value: 160 },
  { datetime: '07:00', value: 170 },
  { datetime: '08:00', value: 180 },
  { datetime: '09:00', value: 190 },
  { datetime: '10:00', value: 200 },
  { datetime: '11:00', value: 210 },
];

export default function GenerationChart() {
  const [realData, setRealData] = useState<GenerationData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGeneration();
        setRealData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setRealData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const chartData = realData || sampleData;

  return (
    <div>
      {loading && <p className="text-gray-500">Loading data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {realData && <p className="text-green-500 text-sm mb-2">Using real ENTSO‑E data</p>}

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
