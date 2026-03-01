"use client";
import React from 'react';
import { CornerPanel } from '@/components/layout/CornerPanel';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid, Cell } from 'recharts';
import { ShieldCheck, Globe, Activity } from 'lucide-react';

export default function MetricsPage() {
    const radarData = [
        { subject: 'TRANSPARENCY', A: 90, fullMark: 100 },
        { subject: 'ACCURACY', A: 95, fullMark: 100 },
        { subject: 'CALMNESS', A: 85, fullMark: 100 },
        { subject: 'ACCESS', A: 88, fullMark: 100 },
        { subject: 'VERIFY', A: 92, fullMark: 100 },
        { subject: 'MULTI-LANG', A: 78, fullMark: 100 },
    ];

    const langData = [
        { lang: 'ENGLISH', users: 45 },
        { lang: 'HINDI', users: 32 },
        { lang: 'TAMIL', users: 12 },
        { lang: 'BENGALI', users: 10 },
        { lang: 'MARATHI', users: 8 },
    ];

    const confData = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        conf: 90 + Math.random() * 8
    }));

    return (
        <div className="flex gap-4 h-full p-2" style={{ height: 'calc(100vh - 120px)' }}>

            {/* Left AI Performance (60%) */}
            <CornerPanel className="flex-[1.5] flex flex-col p-6 h-full">
                <div className="text-cyan font-mono text-[11px] font-bold tracking-[0.2em] mb-4 flex items-center justify-between border-b border-cyan/20 pb-4">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={16} />
                        RESPONSIBLE AI PERFORMANCE RADAR
                    </div>
                    <span className="text-[9px] text-muted/70 font-bold">SYSTEM INTEGRITY: <span className="text-green">99.8%</span></span>
                </div>

                <div className="flex-1 w-full flex items-center justify-center relative min-h-0">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-cyan/10 animate-[spin_60s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-dotted border-cyan/30 animate-[spin_40s_linear_infinite_reverse]" />

                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius={120} data={radarData}>
                            <PolarGrid stroke="rgba(0, 242, 255, 0.15)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--cyan)', fontSize: 9, fontFamily: 'monospace', fontWeight: 'bold' }} />
                            <Radar name="Ethics" dataKey="A" stroke="var(--cyan)" strokeWidth={2} fill="var(--cyan)" fillOpacity={0.1} />
                            <RechartsTooltip contentStyle={{ background: 'rgba(2,10,20,0.95)', border: '1px solid var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '10px' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 h-[80px]">
                    <div className="border border-cyan/20 bg-cyan/5 flex flex-col items-center justify-center gap-2">
                        <span className="font-mono text-[9px] text-muted uppercase tracking-widest font-bold">CORE ACCURACY</span>
                        <span className="font-orbitron text-2xl text-cyan tracking-widest shadow-cyan drop-shadow-md">95.4%</span>
                    </div>
                    <div className="border border-green/30 bg-green/5 flex flex-col items-center justify-center gap-2">
                        <span className="font-mono text-[9px] text-muted uppercase tracking-widest font-bold">FALSE POSITIVE RATE</span>
                        <span className="font-orbitron text-2xl text-green tracking-widest shadow-green drop-shadow-md">0.02%</span>
                    </div>
                    <div className="border border-orange/30 bg-orange/5 flex flex-col items-center justify-center gap-2">
                        <span className="font-mono text-[9px] text-muted uppercase tracking-widest font-bold">LATENCY (MS)</span>
                        <span className="font-orbitron text-2xl text-orange tracking-widest shadow-orange drop-shadow-md">12.8</span>
                    </div>
                </div>
            </CornerPanel>

            {/* Right Stack (40%) */}
            <div className="flex-1 flex flex-col gap-4 h-full">

                {/* Global Access */}
                <CornerPanel className="flex-1 flex flex-col p-6 h-1/2">
                    <div className="text-orange font-mono text-[10px] tracking-[0.2em] font-bold mb-4 flex items-center gap-3 border-b border-orange/20 pb-3">
                        <Globe size={14} />
                        GLOBAL ACCESS METRICS (1000s)
                    </div>
                    <div className="flex-1 min-h-0 pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={langData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }} layout="vertical">
                                <CartesianGrid strokeDasharray="1 3" horizontal={false} stroke="rgba(255,140,0,0.15)" />
                                <XAxis type="number" stroke="var(--muted)" fontSize={9} fontFamily="monospace" tickLine={false} axisLine={false} />
                                <YAxis dataKey="lang" type="category" stroke="var(--orange)" fontSize={9} width={60} fontFamily="monospace" tickLine={false} axisLine={false} />
                                <RechartsTooltip
                                    cursor={{ fill: 'rgba(255,140,0,0.05)' }}
                                    contentStyle={{ background: 'rgba(2,10,20,0.95)', border: '1px solid var(--orange)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}
                                />
                                <Bar dataKey="users" fill="var(--orange)" radius={[0, 2, 2, 0]} maxBarSize={20}>
                                    {langData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fillOpacity={0.9 - (index * 0.1)} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CornerPanel>

                {/* Confidence Interval */}
                <CornerPanel className="flex-1 flex flex-col p-6 h-1/2">
                    <div className="text-green font-mono text-[10px] tracking-[0.2em] font-bold mb-4 flex items-center gap-3 border-b border-green/20 pb-3">
                        <Activity size={14} className="animate-pulse" />
                        MODEL CONFIDENCE INTERVAL (30D)
                    </div>
                    <div className="flex-1 min-h-0 pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={confData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorConf2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--green)" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="var(--green)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="1 3" vertical={false} stroke="rgba(0,255,157,0.15)" />
                                <XAxis dataKey="day" stroke="var(--muted)" fontSize={9} fontFamily="monospace" tickLine={false} axisLine={false} tickFormatter={(val) => `D${val}`} tickMargin={8} />
                                <YAxis domain={[80, 100]} stroke="var(--muted)" fontSize={9} fontFamily="monospace" tickLine={false} axisLine={false} tickCount={5} />
                                <RechartsTooltip
                                    contentStyle={{ background: 'rgba(2,10,20,0.95)', border: '1px solid var(--green)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}
                                    labelFormatter={(val) => `DAY ${val}`}
                                />
                                <Area type="monotone" dataKey="conf" stroke="var(--green)" strokeWidth={2} fillOpacity={1} fill="url(#colorConf2)" style={{ filter: 'drop-shadow(0 0 5px rgba(0,255,157,0.4))' }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CornerPanel>

            </div>
        </div>
    );
}
