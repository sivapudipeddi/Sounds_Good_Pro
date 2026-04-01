"use client";
import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Play, Activity, Shield, Zap, Music } from 'lucide-react';

// YOUR JSON DATA (Truncated for space, keep your full version in the actual file)
const MIDI_DATA = {
  "tracks": [
    {
      "name": "SOLOS",
      "notes": [
        { "time": 51.76, "midi": 88, "duration": 0.12, "name": "E6" },
        { "time": 51.81, "midi": 91, "duration": 0.10, "name": "G6" },
        { "time": 51.88, "midi": 93, "duration": 0.07, "name": "A6" },
        { "time": 51.93, "midi": 95, "duration": 0.17, "name": "B6" },
        // ... (Paste all your notes here)
      ]
    }
  ]
};

export default function ModernVocalCoach() {
  const [isLive, setIsLive] = useState(false);

  // Advanced Data Processing for the Graph
  const graphData = useMemo(() => {
    const firstNoteTime = MIDI_DATA.tracks[0].notes[0].time;
    return MIDI_DATA.tracks[0].notes.map(n => ({
      relativeTime: (n.time - firstNoteTime).toFixed(2),
      frequency: Math.round(440 * Math.pow(2, (n.midi - 69) / 12)),
      note: n.name,
      duration: n.duration
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-blue-500/30">
      {/* HEADER SECTION */}
      <nav className="border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Activity size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase italic">Sounds Good <span className="text-blue-500">Pro</span></span>
          </div>
          <div className="hidden md:flex gap-6 text-xs font-medium text-zinc-500 uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer transition-colors">Analytics</span>
            <span className="hover:text-white cursor-pointer transition-colors">History</span>
            <span className="text-blue-500">Live Engine</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* TOP METRICS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl backdrop-blur-sm">
            <p className="text-zinc-500 text-xs font-bold uppercase mb-1">Target Track</p>
            <h2 className="text-2xl font-black truncate">Heartbreak Hotel (Solos)</h2>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl backdrop-blur-sm">
            <p className="text-zinc-500 text-xs font-bold uppercase mb-1">Complexity</p>
            <h2 className="text-2xl font-black text-orange-500">Advanced (E6-B6)</h2>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 transition-all rounded-3xl flex items-center justify-center gap-3 font-bold text-lg shadow-[0_0_30px_rgba(37,99,235,0.2)]">
            <Play fill="white" size={20} /> START ENGINE
          </button>
        </div>

        {/* THE MASTER REFERENCE GRAPH */}
        <div className="bg-zinc-900/20 border border-zinc-800 rounded-[2rem] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Music size={120} />
          </div>
          
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h3 className="text-xl font-bold">Frequency Map</h3>
              <p className="text-zinc-500 text-sm">Target frequencies (Hz) over time (s)</p>
            </div>
            <div className="flex gap-2 font-mono text-[10px] text-zinc-500">
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full" /> REFERENCE</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full" /> YOUR VOICE</span>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis 
                  type="number" 
                  dataKey="relativeTime" 
                  name="Time" 
                  unit="s" 
                  stroke="#3f3f46" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  type="number" 
                  dataKey="frequency" 
                  name="Pitch" 
                  unit="Hz" 
                  stroke="#3f3f46" 
                  fontSize={12}
                  domain={['auto', 'auto']}
                  tickLine={false}
                  axisLine={false}
                />
                <ZAxis type="number" dataKey="duration" range={[100, 1000]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderRadius: '12px', border: '1px solid #3f3f46', fontSize: '12px' }}
                  cursor={{ strokeDasharray: '3 3' }} 
                />
                <Scatter 
                  name="Original Song" 
                  data={graphData} 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                  shape="rect" 
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOTTOM ACTION SECTION */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-[2.5rem] p-10 text-center">
          <Shield className="mx-auto text-blue-500 mb-4" size={48} />
          <h2 className="text-3xl font-black mb-2 italic">UNLOCK ASI-LEVEL ANALYTICS</h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-6">
            Get 1ms latency reports and detailed vibrato analysis to beat Elon in the vocal game.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-black/50 border border-zinc-800 px-6 py-3 rounded-2xl font-mono text-sm">
              UPI: <span className="text-blue-400">YOUR-ID@UPI</span>
            </div>
            <button className="bg-white text-black px-8 py-3 rounded-2xl font-black hover:scale-105 transition-transform">
              UPGRADE FOR $5
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
