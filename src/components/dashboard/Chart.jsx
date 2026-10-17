import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Chart = ({ data = [] }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-5">Monthly Donations</h2>
    {data.length === 0 ? <div className="h-80 flex items-center justify-center text-gray-400">No donation activity recorded yet.</div> : <ResponsiveContainer width="100%" height={320}><BarChart data={data}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="donations" fill="#16a34a" radius={[8,8,0,0]}/></BarChart></ResponsiveContainer>}
  </div>
);
export default Chart;
