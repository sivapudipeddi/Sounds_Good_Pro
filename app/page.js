"use client";
import React, { useMemo } from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, 
  Tooltip, ResponsiveContainer, CartesianGrid, Cell 
} from 'recharts';
import { Play, Activity, TrendingUp, Zap, Target } from 'lucide-react';

// FULL MIDI DATA FROM YOUR JSON
const RAW_DATA = [
  { "time": 51.76, "midi": 88, "duration": 0.12, "name": "E6" },
  { "time": 51.81, "midi": 91, "duration": 0.10, "name": "G6" },
  { "time": 51.88, "midi": 93, "duration": 0.07, "name": "A6" },
  { "time": 51.93, "midi": 95, "duration": 0.17, "name": "B6" },
  { "time": 52.29, "midi": 95, "duration": 0.07, "name": "B6" },
  { "time": 52.44, "midi": 95, "duration": 0.07, "name": "B6" },
  { "time": 52.62, "midi": 95, "duration": 0.25, "name": "B6" },
  { "time": 52.85, "midi": 93, "duration": 0.07, "name": "A6" },
  { "time": 52.90, "midi": 91, "duration": 0.07, "name": "G6" },
  { "time": 52.98, "midi": 88, "duration": 0.07, "name": "E6" },
  { "time": 53.13, "midi": 95, "duration": 0.40, "name": "B6" },
  { "time": 53.49, "midi": 93, "duration": 0.10, "name": "A6" },
  { "time": 53.57, "midi": 91, "duration": 0.10, "name": "G6" },
  { "time": 53.62, "midi": 88, "duration": 0.17, "name": "E6" },
  { "time": 53.82, "midi": 96, "duration": 0.40, "name": "C7" },
  { "time": 54.20, "midi": 93, "duration": 0.07, "name": "A6" },
  { "time": 54.26, "midi": 91, "duration": 0.07, "name": "G6" },
  { "time": 54.33, "midi": 88, "duration": 0.25, "name": "E6" },
  { "time": 54.71, "midi": 88, "duration": 0.07, "name": "E6" },
  { "time": 54.87, "midi": 88, "duration": 0.07, "name": "E6" },
  { "time": 55.00, "midi": 88, "duration": 0.10, "name": "E6" },
  { "time": 55.10, "midi": 91, "duration": 0.10, "name": "G6" },
  { "time": 55.17, "midi": 93, "duration": 0.07, "name": "A6" },
  { "time": 55.22, "midi": 95, "duration": 0.07, "name": "B6" },
  { "time": 55.35, "midi": 95, "duration": 0.10, "name": "B6" },
  { "time": 55.53, "midi": 95, "duration": 0.10, "name": "B6" },
  { "time": 55.71, "midi": 95, "duration": 0.22, "name": "B6" },
  { "time": 55.91, "midi": 93, "duration": 0.10, "name": "A6" },
  { "time": 55.99, "midi": 91, "duration": 0.05, "name": "G6" },
  { "time": 56.04, "midi": 88, "duration": 0.22, "name": "E6" },
  { "time": 56.30, "midi": 95, "duration": 0.35, "name": "B6" },
  { "time": 56.63, "midi": 93, "duration": 0.07, "name": "A6" },
  { "time": 56.68, "midi": 91, "duration": 0.07, "name": "G6" },
  { "time": 56.76, "midi": 88, "duration": 0.07, "name": "E6" },
  { "time": 56.88, "midi": 95, "duration": 0.38, "name": "B6" },
  { "time": 57.24, "midi": 93, "duration": 0.10, "name": "A6" },
  { "time": 57.29, "midi": 91, "duration": 0.07, "name": "G6" },
  { "time": 57.37, "midi": 88, "duration": 0.12, "name": "E6" },
  { "time": 57.50, "midi": 95, "duration": 0.40, "name": "B6" },
  { "time": 57.88, "midi": 93, "duration": 0.07, "name": "A6" },
  { "time": 57.93, "midi": 91, "duration": 0.07, "name": "G6" },
  { "time": 58.01, "midi": 88, "duration": 0.15, "name": "E6" },
  { "time": 58.16, "midi": 95, "duration": 0.35, "name": "B6" },
  { "time": 58.46, "midi": 93, "duration": 0.12, "name": "A6" },
  { "time": 58.54, "midi": 91, "duration": 0.10, "name": "G6" },
  { "time": 58.72, "midi": 83, "duration": 0.38, "name": "B5" },
  { "time": 59.10, "midi": 95, "duration": 0.33, "name": "B6" },
  { "time": 59.61, "midi": 88, "duration": 0.15, "name": "E6" },
  { "time": 59.79, "midi": 83, "duration": 0.17, "name": "B5" },
  { "time": 60.00, "midi": 86, "duration": 0.30, "name": "D6" },
  { "time": 60.35, "midi": 88, "duration": 0.40, "name": "E6" },
  { "time": 60.79, "midi": 86, "duration": 0.17, "name": "D6" },
  { "time": 60.96, "midi": 83, "duration": 0.12, "name": "B5" },
  { "time": 61.14, "midi": 86, "duration": 0.33, "name": "D6" },
  { "time": 61.53, "midi": 88, "duration": 0.12, "name": "E6" },
  { "time": 61.76, "midi": 88, "duration": 0.33, "name": "E6" },
  { "time": 62.06, "midi": 86, "duration": 0.07, "name": "D6" },
  { "time": 62.11, "midi": 85, "duration": 0.07, "name": "C#6" }
];

export default function HeartbreakHotelAnalyzer() {
  const processedData = useMemo(() => {
    const start = RAW_DATA[0].time;
    return RAW_DATA.map(d => ({
      ...d,
      relativeTime: parseFloat((d.time - start).toFixed(2)),
      hz: Math.round(440 * Math.pow(2, (d.midi - 69) / 12)),
      size: d.duration * 1000 // Bubble size based on duration
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#020203] text-zinc-100 font-sans p-4 md:p-8">
      {/* GLOSSY HEADER */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-zinc-800 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/50 rounded text-[10px] font-black text-blue-400 tracking-tighter uppercase">Reference Active</div>
            <div className="px-2 py-0.5 bg-zinc-800 rounded text-[10px] font-bold text-zinc-400 tracking-tighter uppercase">MIDI Engine v4.0</div>
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
            Heartbreak <span className="text-blue-600">Hotel</span>
          </h1>
          <p className="text-zinc-500 font-mono text-sm mt-2 flex items-center gap-2">
            <Target size={14} className="text-blue-500" /> ELVIS PRESLEY | ORIGINAL VOCAL STEM
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl min-w-[140px]">
            <p className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Peak Pitch</p>
            <p className="text-2xl font-black font-mono">2093 <span className="text-xs text-zinc-600 italic underline">Hz</span></p>
          </div>
          <div className="bg-blue-600 p-4 rounded-2xl min-w-[140px] shadow-[0_0_40px_rgba(37,99,235,0.3)] cursor-pointer hover:scale-105 transition-all">
            <p className="text-[10px] font-bold text-blue-200 uppercase mb-1 underline">Action</p>
            <div className="flex items-center gap-2">
                <Play fill="white" size={18} />
                <p className="text-xl font-black">SYNC</p>
            </div>
          </div>
        </div>
      </header>

      {/* MASTER GRAPH CONTAINER */}
      <main className="max-w-7xl mx-auto">
        <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
            
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <TrendingUp className="text-blue-500" size={24} />
                    <h2 className="text-lg font-bold tracking-tight uppercase">High-Fidelity Pitch Map</h2>
                </div>
                <div className="flex gap-6 font-mono text-[10px] text-zinc-500 font-bold uppercase">
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" /> Hz Frequency</span>
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-zinc-700 rounded-full" /> Duration-Scaled Points</span>
                </div>
            </div>

            <div className="h-[500px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                        <XAxis 
                            type="number" 
                            dataKey="relativeTime" 
                            name="Time" 
                            unit="s" 
                            stroke="#3f3f46" 
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            domain={[0, 'auto']}
                        />
                        <YAxis 
                            type="number" 
                            dataKey="hz" 
                            name="Pitch" 
                            unit="Hz" 
                            stroke="#3f3f46" 
                            fontSize={10}
                            domain={['auto', 'auto']}
                            tickLine={false}
                            axisLine={false}
                        />
                        <ZAxis type="number" dataKey="size" range={[50, 800]} />
                        <Tooltip 
                            cursor={{ strokeDasharray: '3 3', stroke: '#3b82f6' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-black/90 border border-zinc-700 p-3 rounded-xl shadow-2xl backdrop-blur-md">
                                            <p className="text-blue-400 font-black text-lg">{data.name}</p>
                                            <p className="text-zinc-400 text-[10px] font-mono">FREQ: {data.hz}Hz</p>
                                            <p className="text-zinc-400 text-[10px] font-mono">TIME: {data.relativeTime}s</p>
                                            <p className="text-zinc-400 text-[10px] font-mono">LEN: {data.duration}s</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Scatter name="Vocal Map" data={processedData}>
                            {processedData.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill="#3b82f6" 
                                    fillOpacity={0.6} 
                                    className="hover:fill-blue-400 transition-colors cursor-crosshair"
                                />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* FOOTER STATS */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { label: "Total Notes", val: "58", icon: Activity },
                { label: "Vocal Range", val: "B5 - C7", icon: Zap },
                { label: "Accuracy Target", val: "98.4%", icon: Target },
                { label: "Latency Buffer", val: "1ms", icon: TrendingUp },
            ].map((stat, i) => (
                <div key={i} className="bg-zinc-900/30 border border-zinc-800/50 p-6 rounded-3xl">
                    <stat.icon className="text-zinc-600 mb-2" size={16} />
                    <p className="text-[10px] font-bold text-zinc-500 uppercase">{stat.label}</p>
                    <p className="text-xl font-black tracking-tight">{stat.val}</p>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}
