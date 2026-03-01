"use client";
import React, { useState } from 'react';
import { CornerPanel } from '@/components/layout/CornerPanel';

export default function SimulationPage() {
    const [diameter, setDiameter] = useState(150);
    const [velocity, setVelocity] = useState(20);
    const [composition, setComposition] = useState('Rocky');
    const [budget, setBudget] = useState(18.60);
    const [outcome, setOutcome] = useState<string | null>(null);

    const densities: Record<string, number> = { Rocky: 2500, Iron: 7800, Ice: 900 };
    const density = densities[composition];
    const r = diameter / 2;
    const mass = density * (4 / 3) * Math.PI * Math.pow(r, 3); // kg
    const energyJoules = 0.5 * mass * Math.pow(velocity * 1000, 2);
    const megatons = energyJoules / 4.184e15;
    const crater = 0.07 * Math.pow(megatons, 0.3); // km
    const hiroshima = megatons * 66.6;

    const handleDefense = (cost: number, effect: number) => {
        if (budget >= cost) {
            setBudget(b => b - cost);
            const success = (effect + Math.random() * 20) > 60;
            setOutcome(success ? 'DEFLECTION SUCCESSFUL' : 'DEFLECTION FAILED.');
        }
    };

    return (
        <div className="flex gap-4 h-full p-2" style={{ height: 'calc(100vh - 120px)' }}>

            {/* Left side: Controls (30%) */}
            <div className="w-[30%] min-w-[320px] flex flex-col gap-4 h-full relative">

                {/* Asteroid Kinetics Panel */}
                <CornerPanel className="flex flex-col gap-6 p-5">

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between font-mono text-[10px] text-muted tracking-widest uppercase items-center">
                                <span>DIAMETER (m):</span>
                                <span className="text-cyan font-bold">{diameter}m</span>
                            </div>
                            <input type="range" min="10" max="1000" step="10" value={diameter} onChange={e => setDiameter(Number(e.target.value))} className="w-full" />
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between font-mono text-[10px] text-muted tracking-widest uppercase items-center mt-2">
                                <span>VELOCITY (km/s):</span>
                                <span className="text-cyan font-bold">{velocity}km/s</span>
                            </div>
                            <input type="range" min="5" max="70" step="1" value={velocity} onChange={e => setVelocity(Number(e.target.value))} className="w-full" />
                        </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                        {['Rocky', 'Iron', 'Ice'].map(c => (
                            <button key={c}
                                className={`flex-1 py-2 font-mono text-[10px] tracking-widest transition-colors border uppercase ${composition === c ? 'bg-cyan/10 border-cyan text-cyan drop-shadow-[0_0_8px_rgba(0,242,255,0.4)] font-bold' : 'bg-transparent border-cyan/20 text-muted/70 hover:border-cyan/50 hover:text-cyan'}`}
                                onClick={() => setComposition(c)}>
                                {c}
                            </button>
                        ))}
                    </div>
                </CornerPanel>

                {/* Defense Game Panel */}
                <CornerPanel className="flex-1 flex flex-col p-5 h-full">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] text-muted font-mono tracking-widest uppercase">BUDGET: </span>
                        <span className="text-[11px] text-cyan font-mono tracking-widest font-bold">${budget.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-1 mb-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className={`h-1.5 flex-1 ${i < budget / 3 ? 'bg-cyan' : 'bg-cyan/10'}`}></div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <button
                            className="bg-transparent border border-orange text-orange font-mono text-[10px] tracking-widest p-3 flex justify-center items-center font-bold hover:bg-orange/10 hover:shadow-[0_0_15px_rgba(255,140,0,0.3)] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            onClick={() => handleDefense(2, 70)}
                            disabled={budget < 2}
                        >
                            DEPLOY KINETIC IMPACTOR
                        </button>

                        <button
                            className="bg-transparent border border-cyan text-cyan font-mono text-[10px] tracking-widest p-3 flex justify-center items-center hover:bg-cyan/10 hover:shadow-[0_0_15px_rgba(0,242,255,0.3)] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            onClick={() => handleDefense(1.5, 60)}
                            disabled={budget < 1.5}
                        >
                            GRAVITY TRACTOR ENGAGEMENT
                        </button>
                    </div>

                    {outcome && (
                        <div className="mt-8 text-center animate-pulse">
                            <span className={`font-mono text-[12px] tracking-widest font-bold drop-shadow-md ${outcome.includes('SUCCESS') ? 'text-green' : 'text-red'}`}>{outcome}</span>
                        </div>
                    )}
                </CornerPanel>
            </div>

            {/* Right side: Visualization (70%) */}
            <CornerPanel className="flex-1 flex flex-col justify-between h-full p-0 relative overflow-hidden">
                <div className="absolute top-4 left-4 text-muted/70 font-mono text-[9px] tracking-widest z-10">RENDERING IMPACT KINETICS...</div>

                {/* Main Sim Area */}
                <div className="flex-1 w-full flex items-center justify-center relative bg-[#01060E]">
                    {/* Background faint Grid */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0, 242, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    {/* Earth Body */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-cyan shadow-[0_0_30px_rgba(0,242,255,0.8)] z-10" />

                    {/* Orbit / Gravity Rings */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-cyan/10" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan/5" />

                    {/* Incoming Threat */}
                    <div className="absolute w-2 h-2 rounded-full bg-orange shadow-[0_0_10px_var(--orange)] z-20" style={{
                        top: '40%', right: '35%',
                        transform: `scale(${Math.max(0.3, diameter / 300)})`
                    }}></div>
                </div>

                {/* Bottom Readouts Grid */}
                <div className="h-[80px] border-t border-cyan/20 bg-black/40 flex">
                    <div className="flex-1 border-r border-cyan/10 flex flex-col justify-center px-6 gap-2">
                        <span className="text-[9px] text-muted font-mono tracking-widest lowercase">ENERGY:</span>
                        <span className="text-lg text-orange font-orbitron font-bold drop-shadow-[0_0_8px_rgba(255,140,0,0.4)]">
                            {megatons > 1000 ? (megatons / 1000).toFixed(1) + ' GT' : megatons.toFixed(1) + ' MT'}
                        </span>
                    </div>
                    <div className="flex-1 border-r border-cyan/10 flex flex-col justify-center px-6 gap-2">
                        <span className="text-[9px] text-muted font-mono tracking-widest lowercase">CRATER:</span>
                        <span className="text-lg text-cyan font-orbitron font-bold drop-shadow-[0_0_8px_rgba(0,242,255,0.4)]">
                            {crater.toFixed(2)} km
                        </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center px-6 gap-2">
                        <span className="text-[9px] text-muted font-mono tracking-widest lowercase">HIROSHIMAS:</span>
                        <span className="text-lg text-red font-orbitron font-bold drop-shadow-[0_0_8px_rgba(255,45,85,0.4)]">
                            {Math.floor(hiroshima).toLocaleString()}
                        </span>
                    </div>
                </div>

            </CornerPanel>
        </div>
    );
}
