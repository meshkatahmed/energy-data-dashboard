"use client";
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { fetchGeneration, GenerationData } from '@/services/entsoe';

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

  return (
    <div>
      {loading && <p className="text-gray-500">Loading data...</p>} 
      {error && <p className="text-red-500">Error: {error}</p>} 
      {realData && <p className="text-green-500 text-sm mb-2">Using real ENTSO‑E data for Germany, Italy, and France</p>}
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={realData || []} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="Germany" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} name="Germany" />
          <Line type="monotone" dataKey="Italy" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} name="Italy" />
          <Line type="monotone" dataKey="France" stroke="#dc2626" strokeWidth={2} dot={{ r: 3 }} name="France" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
