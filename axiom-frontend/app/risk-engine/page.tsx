"use client";
import React, { useState } from 'react';
import { useNASAData } from '@/hooks/useNASAData';
import { RiskGauge } from '@/components/ui/RiskGauge';
import { CornerPanel } from '@/components/layout/CornerPanel';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

export default function RiskEnginePage() {
    const { neoData, loading } = useNASAData();
    const [selectedNeoId, setSelectedNeoId] = useState<string>('');

    const activeNeo = selectedNeoId ? neoData.find(n => n.id === selectedNeoId) : neoData[0];

    // Colors matching screenshot
    const pieData = [
        { name: 'Velocity', value: 48, fill: 'var(--cyan)' },
        { name: 'Distance', value: 30, fill: 'var(--green)' },
        { name: 'Size', value: 22, fill: 'var(--orange)' }
    ];

    return (
        <div className="flex gap-4 h-full p-2" style={{ height: 'calc(100vh - 120px)' }}>
            {/* Target Selector (Left Panel) - 25% */}
            <CornerPanel className="w-[300px] flex-shrink-0 flex flex-col gap-4 p-4 pl-5">
                {loading ? (
                    <div className="text-cyan mono text-[10px] tracking-widest animate-pulse border border-dashed border-cyan/30 p-4 text-center">FETCHING DATA...</div>
                ) : (
                    <div className="relative group">
                        <select
                            value={activeNeo?.id || ''}
                            onChange={e => setSelectedNeoId(e.target.value)}
                            className="w-full bg-black/40 border border-cyan/50 text-white font-mono text-[11px] tracking-widest outline-none cursor-pointer appearance-none px-3 py-2.5"
                        >
                            {neoData.map(n => <option key={n.id} value={n.id}>({n.id})</option>)}
                        </select>
                    </div>
                )}

                {/* Visual List Mimicking Dropdown State in Mockup */}
                <div className="flex flex-col border border-cyan/20 bg-black/20">
                    <div className="px-3 py-2 text-[11px] mono text-white/50 border-b border-cyan/10 hover:bg-white/5 cursor-pointer">(2012 OM32)</div>
                    <div className="px-3 py-2 text-[11px] mono text-black bg-white/70 border-b border-cyan/10 cursor-pointer font-bold">(2014 YW14)</div>
                    <div className="px-3 py-2 text-[11px] mono text-white/50 hover:bg-white/5 cursor-pointer">(2020 RX15)</div>
                </div>

                <div className="mt-4">
                    <button className="w-full bg-transparent border border-cyan text-cyan font-orbitron text-[11px] font-bold tracking-[0.2em] flex justify-center items-center py-2.5 transition-all hover:bg-cyan/10 hover:shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                        RUN DEEP ANALYSIS
                    </button>
                </div>
            </CornerPanel>

            {/* Main Gauge (Center Panel) - 40% */}
            <CornerPanel className="flex-1 flex flex-col justify-center items-center p-6 relative">
                <RiskGauge activeNeo={activeNeo} />
            </CornerPanel>

            {/* Breakdown Section (Right Panel) - 35% */}
            <CornerPanel className="w-[400px] flex-shrink-0 flex flex-col p-6 pr-8">
                <div className="flex-1 min-h-[220px] relative w-full flex justify-center items-center mt-8">
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%" cy="50%"
                                innerRadius={60}
                                outerRadius={85}
                                stroke="#020A14"
                                strokeWidth={4}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {pieData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                            </Pie>
                            <RechartsTooltip
                                contentStyle={{ background: 'rgba(2,10,20,0.95)', border: '1px solid var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan"></div>
                        <span className="font-mono text-[11px] text-muted/80 tracking-widest font-bold uppercase">Velocity Weight: 48%</span>
                    </div>
                    <p className="font-mono text-[10px] text-white/90 leading-relaxed tracking-wide italic">
                        "The score is primarily driven by the object's relative velocity and its proximity to Earth's orbital path. Current data suggests a stable trajectory."
                    </p>
                </div>
            </CornerPanel>
        </div>
    );
}
