"use client";
import React, { useEffect, useRef, useState } from 'react';
import { PitchDetector } from "pitchy";
import { Mic, CreditCard } from 'lucide-react';

export default function SoundsGoodPro() {
  const [note, setNote] = useState("--");
  const [clarity, setClarity] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const requestRef = useRef();

  const startEngine = async () => {
    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtxRef.current.createAnalyser();
    analyser.fftSize = 2048;
    
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioCtxRef.current.createMediaStreamSource(stream).connect(analyser);

    const detector = PitchDetector.forFloat32Array(analyser.fftSize);
    const input = new Float32Array(analyser.fftSize);
    setIsLive(true);

    const draw = () => {
      analyser.getFloatTimeDomainData(input);
      const [pitch, c] = detector.findPitch(input, audioCtxRef.current.sampleRate);
      
      setClarity(c);
      if (c > 0.8) {
        const midiNote = Math.round(12 * Math.log2(pitch / 440) + 69);
        const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        setNote(names[midiNote % 12]);
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (c > 0.8) {
        ctx.fillStyle = "#22c55e";
        ctx.beginPath();
        ctx.arc(200, 200 - (pitch / 5), 5, 0, Math.PI * 2);
        ctx.fill();
      }

      requestRef.current = requestAnimationFrame(draw);
    };
    draw();
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-black italic">SOUNDS GOOD <span className="text-blue-500">PRO</span></h1>
          <div className="bg-zinc-900 px-4 py-2 rounded-full text-xs border border-zinc-800">
            Clarity: {(clarity * 100).toFixed(0)}%
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-video bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
              <iframe 
                width="100%" height="100%" 
                src="https://www.youtube.com/embed/qiiyq2xrSI0" 
                frameborder="0" allowfullscreen>
              </iframe>
            </div>
            <button 
              onClick={startEngine}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Mic size={20} /> {isLive ? "ANALYZING..." : "START VOCAL COACH"}
            </button>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <p className="text-zinc-500 text-sm uppercase font-bold mb-2">Note</p>
            <h2 className="text-8xl font-black">{note}</h2>
            <canvas ref={canvasRef} width="400" height="200" className="w-full bg-black rounded-lg mt-4 border border-zinc-800"></canvas>
          </div>
        </div>

        <div className="mt-12 p-8 rounded-3xl bg-zinc-900 border border-blue-500/20 text-center">
          <h3 className="text-2xl font-bold mb-2">Unlock Full Accuracy Report</h3>
          <p className="text-zinc-400 mb-6">Transfer $5 via Wise/UPI to unlock professional insights.</p>
          <div className="flex flex-col gap-2">
            <p className="text-blue-400 font-bold">UPI: [INSERT YOUR UPI ID HERE]</p>
            <p className="text-sm text-zinc-500 italic">Send screenshot to confirm payment</p>
          </div>
        </div>
      </div>
    </main>
  );
}
