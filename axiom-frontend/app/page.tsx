"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { Shield, Crosshair, Zap, Layers } from 'lucide-react';
import { useNASAData } from '@/hooks/useNASAData';
import { KPICard } from '@/components/ui/KPICard';
import { ThreatRow } from '@/components/ui/ThreatRow';
import { CornerPanel } from '@/components/layout/CornerPanel';
import { calcRisk } from '@/lib/riskCalculator';

export default function OverviewPage() {
    const { neoData, loading } = useNASAData();
    const [counters, setCounters] = useState({ risk: '0.0', neo: 0, solar: 0, sat: 0 });

    const targetRisk = neoData.length > 0 ? Math.max(...neoData.map(n => parseFloat(calcRisk(n)))) : 28.2;
    const targetSolar = 52;
    const targetSat = 3;

    useEffect(() => {
        let frame: number;
        let progress = 0;
        const animate = () => {
            progress += 0.05;
            if (progress > 1) progress = 1;
            setCounters({
                risk: (targetRisk * progress).toFixed(1),
                neo: Math.floor(neoData.length * progress),
                solar: Math.floor(targetSolar * progress),
                sat: Math.floor(targetSat * progress)
            });
            if (progress < 1) frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [neoData.length, targetRisk, targetSolar, targetSat]);

    const timelineData = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
        time: i + ':00',
        asteroid: Math.random() * 20 + 10,
        satellite: Math.random() * 25 + 5,
        solar: Math.random() * 15 + 10,
    })), []);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-bg border border-cyan/50 p-3 shadow-[0_0_15px_rgba(0,242,255,0.2)]">
                    <p className="font-mono text-white text-[10px] font-bold mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex gap-2 items-center font-mono text-[9px] mb-1">
                            <span style={{ color: entry.color }}>{entry.name}:</span>
                            <span style={{ color: entry.color }}>{entry.value}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col h-full gap-4 p-2 w-full max-w-7xl mx-auto" style={{ height: 'calc(100vh - 120px)' }}>

            {/* Top KPIs - Fixed Height 100px */}
            <div className="flex gap-4 w-full h-[100px] flex-shrink-0">
                <div className="w-[28%]">
                    <KPICard title="PLANETARY RISK SCORE" value={counters.risk} icon={Shield} colorClass="text-green" />
                </div>
                <div className="flex-1">
                    <KPICard title="ACTIVE NEOS TODAY" value={counters.neo} highlight="+2 detected" icon={Crosshair} colorClass="text-cyan" />
                </div>
                <div className="flex-1">
                    <KPICard title="SOLAR ACTIVITY INDEX" value={counters.solar} icon={Zap} colorClass="text-orange" />
                </div>
                <div className="w-[25%]">
                    <KPICard title="SATELLITE CONJUNCTIONS" value={counters.sat} icon={Layers} colorClass="text-red" />
                </div>
            </div>

            {/* Bottom 3 Panels - Flex Fill Remaining Height */}
            <div className="flex gap-4 flex-1 w-full min-h-0">

                {/* Panel 1: Live Telemetry (Sine Wave) - 28% Width */}
                <CornerPanel className="w-[30%] h-full flex flex-col relative overflow-hidden p-6 bg-transparent border-cyan/30">
                    <div className="absolute top-6 right-6 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red animate-pulse"></div>
                        <span className="text-[9px] text-red font-mono tracking-widest font-bold">LIVE TELEMETRY</span>
                    </div>
                    <div className="flex-1 w-full h-full relative flex items-center justify-center mt-6">
                        <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
                            {/* Fluid Sine wave path */}
                            <path d="M 0 100 Q 50 150, 100 100 T 200 100 T 300 100 T 400 100" fill="none" stroke="var(--cyan)" strokeWidth="1" />
                            {/* Background faint sine wave */}
                            <path d="M 0 100 Q 50 50, 100 100 T 200 100 T 300 100 T 400 100" fill="none" stroke="var(--cyan)" strokeWidth="0.5" strokeDasharray="3 3" style={{ opacity: 0.3 }} />

                            {/* Scatter red dot particles */}
                            <circle cx="80" cy="160" r="2" fill="var(--red)" style={{ opacity: 0.8 }} />
                            <circle cx="160" cy="180" r="2" fill="var(--red)" style={{ opacity: 0.8 }} />
                            <circle cx="210" cy="60" r="2" fill="var(--red)" style={{ opacity: 0.8 }} />
                            <circle cx="280" cy="130" r="2" fill="var(--red)" style={{ opacity: 0.8 }} />
                            <circle cx="360" cy="80" r="2" fill="var(--red)" style={{ opacity: 0.8 }} />
                        </svg>
                    </div>
                </CornerPanel>

                {/* Panel 2: Center Timeline Graph - 45% Width */}
                <CornerPanel className="flex-1 h-full p-4 pb-2 bg-transparent border-cyan/30">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="1 3" stroke="var(--cyan)" vertical={true} horizontal={true} opacity={0.15} />
                            <XAxis dataKey="time" stroke="var(--muted)" fontSize={9} fontFamily="var(--font-mono)" tickMargin={8} axisLine={true} tickLine={true} />
                            <YAxis stroke="var(--muted)" fontSize={9} fontFamily="var(--font-mono)" axisLine={true} tickLine={true} tickCount={5} domain={[0, 32]} />

                            <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.4)', strokeWidth: 1 }} />

                            <Area type="monotone" dataKey="asteroid" stroke="var(--cyan)" strokeWidth={1.5} fill="var(--cyan)" fillOpacity={0.1} isAnimationActive={false} />
                            <Area type="monotone" dataKey="satellite" stroke="var(--red)" strokeWidth={1.5} fill="none" isAnimationActive={false} />
                            <Area type="monotone" dataKey="solar" stroke="var(--orange)" strokeWidth={1.5} fill="none" isAnimationActive={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </CornerPanel>

                {/* Panel 3: Target List - 25% Width */}
                <CornerPanel className="w-[25%] h-full flex flex-col pt-0 pb-0 px-2 overflow-y-auto bg-transparent border-cyan/30">
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="text-cyan mono text-[10px] tracking-widest animate-pulse w-full mx-4 text-center">SCANNING SECTOR...</div>
                        </div>
                    ) : (
                        <div className="flex flex-col px-4 py-2">
                            {neoData.map(n => <ThreatRow key={n.id} n={n} />)}
                        </div>
                    )}
                </CornerPanel>

            </div>
        </div>
    );
}
