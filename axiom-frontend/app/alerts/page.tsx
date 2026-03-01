"use client";
import React from 'react';
import { CornerPanel } from '@/components/layout/CornerPanel';
import { useNASAData } from '@/hooks/useNASAData';
import { calcRisk } from '@/lib/riskCalculator';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { AlertTriangle, CheckCircle2, Radio } from 'lucide-react';

const AlertCard = ({ title, score, source, region, verified, isCritical = false }: any) => {
    const color = isCritical ? 'var(--red)' : score > 20 ? 'var(--orange)' : 'var(--cyan)';
    const bgClass = isCritical ? 'bg-red/5' : score > 20 ? 'bg-orange/5' : 'bg-cyan/5';
    const textClass = isCritical ? 'text-red' : score > 20 ? 'text-orange' : 'text-cyan';

    return (
        <div className={`flex justify-between items-center p-4 mb-3 border-l-[3px] ${bgClass} transition-colors border border-transparent`} style={{ borderLeftColor: color }}>
            <div className="flex flex-col gap-2">
                <div className={`font-mono text-[11px] tracking-widest flex items-center gap-2 font-bold ${textClass}`} style={{ textShadow: `0 0 8px ${color}` }}>
                    {isCritical && <AlertTriangle size={14} className="animate-pulse" />}
                    {title}
                </div>
                <div className="font-mono text-[9px] text-muted/70 tracking-widest uppercase">
                    <span>SRC: <span className="text-white font-bold">{source}</span></span>
                    <span className="mx-3 opacity-30">|</span>
                    <span>REG: <span className="text-white font-bold">{region}</span></span>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className={`font-orbitron text-[16px] font-bold ${textClass} tracking-widest`} style={{ textShadow: `0 0 8px ${color}` }}>
                    S_RI: {score.toFixed(1)}
                </div>
                {verified ? (
                    <div className="font-mono text-[9px] text-green tracking-widest flex items-center gap-1 font-bold">VERIFIED <CheckCircle2 size={10} /></div>
                ) : (
                    <div className="font-mono text-[9px] text-orange tracking-widest flex items-center gap-1 font-bold animate-pulse">UNVERIFIED</div>
                )}
            </div>
        </div>
    );
};

export default function AlertsPage() {
    const { neoData } = useNASAData();

    const alertsData = [
        { name: 'NEO', count: 12 },
        { name: 'SOLR', count: 5 },
        { name: 'SAT', count: 18 },
        { name: 'ENV', count: 3 }
    ];

    const highestScore = neoData.length > 0 ? Math.max(...neoData.map(n => parseFloat(calcRisk(n)))) : 28.2;

    return (
        <div className="flex gap-4 h-full p-2" style={{ height: 'calc(100vh - 120px)' }}>

            {/* Left Column: Threats List (60%) */}
            <CornerPanel className="flex-[1.8] flex flex-col p-6 h-full overflow-hidden">
                <div className="text-cyan font-mono text-[11px] tracking-[0.2em] font-bold mb-4 flex items-center justify-between border-b border-cyan/20 pb-4">
                    <div className="flex items-center gap-3">
                        <AlertTriangle size={16} />
                        GLOBAL THREAT ALERTS
                    </div>
                    <div className="flex items-center gap-2 text-muted/80">
                        <Radio size={14} className="animate-pulse text-cyan" />
                        <span className="text-[9px]">LIVE FEED</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2">
                    {neoData.slice(0, 1).map(n => (
                        <AlertCard key={n.id} title={'NEO ' + n.name + ' TRAJECTORY OVERLAP'} score={highestScore} source="NASA JPL" region="GLOBAL" verified={true} isCritical={highestScore > 50} />
                    ))}
                    <AlertCard title="CLASS-X SOLAR FLARE DETECTED" score={34.5} source="NOAA" region="REGIONAL" verified={true} isCritical={false} />
                    <AlertCard title="SATELLITE CONJUNCTION: ISS" score={82.1} source="ESA" region="LEO" verified={true} isCritical={true} />
                    <AlertCard title="UNIDENTIFIED RADAR ANOMALY" score={15.0} source="USSPACECOM" region="PACIFIC" verified={false} isCritical={false} />
                    <AlertCard title="NEO 2024 AB1 CLOSE APPROACH" score={22.4} source="NASA JPL" region="GLOBAL" verified={true} isCritical={false} />
                    <AlertCard title="ORBITAL DEBRIS CLOUD" score={48.2} source="ESA" region="GEO" verified={true} isCritical={false} />
                </div>
            </CornerPanel>

            {/* Right Column: Analytics & Plots (40%) */}
            <div className="flex-[1.2] flex flex-col gap-4 h-full">

                {/* Active Threat Analysis */}
                <CornerPanel className="flex-1 flex flex-col p-0 overflow-hidden bg-bg">
                    <div className="bg-red/10 border-b border-red/30 p-4">
                        <div className="text-red font-mono text-[10px] tracking-widest font-bold flex items-center justify-between">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red animate-pulse"></div> HIGH PRIORITY: SATELLITE CONJUNCTION</span>
                            <span className="text-white font-orbitron text-[12px] tracking-widest drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]">T-MINUS 04:12:00</span>
                        </div>
                    </div>

                    <div className="p-5 font-mono text-[10px] tracking-[0.15em] flex flex-col gap-4">
                        <div className="flex justify-between items-center border-b border-dashed border-white/10 pb-2"><span className="text-muted/70">OBJECT A:</span> <span className="text-cyan font-bold" style={{ textShadow: '0 0 8px var(--cyan)' }}>ISS (25544)</span></div>
                        <div className="flex justify-between items-center border-b border-dashed border-white/10 pb-2"><span className="text-muted/70">OBJECT B:</span> <span className="text-orange font-bold" style={{ textShadow: '0 0 8px var(--orange)' }}>DEBRIS 2022-057C</span></div>
                        <div className="flex justify-between items-center border-b border-dashed border-white/10 pb-2"><span className="text-muted/70">EST. MISS DISTANCE:</span> <span className="text-white font-bold">847 m</span></div>
                        <div className="flex justify-between items-center border-b border-dashed border-white/10 pb-2"><span className="text-muted/70">COLLISION PROBABILITY:</span> <span className="text-red font-bold">0.0012%</span></div>
                        <div className="flex justify-between items-center mt-2"><span className="text-muted/70">CURRENT POSTURE:</span> <span className="text-red animate-pulse font-bold underline underline-offset-4 line-through decoration-red/50">EVASION PLANNING</span></div>
                    </div>

                    {/* Simple SVG Track */}
                    <div className="flex-1 border-t border-cyan/10 relative overflow-hidden bg-[#01060E]">
                        <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                            <path d="M 0 40 Q 50 10 100 40" fill="none" stroke="var(--cyan)" strokeWidth="0.5" strokeDasharray="2,2" />
                            <path d="M 0 10 Q 50 40 100 10" fill="none" stroke="var(--orange)" strokeWidth="0.5" strokeDasharray="2,2" />
                            <circle cx="50" cy="25" r="4" fill="none" stroke="var(--red)" strokeWidth="0.5" strokeDasharray="1,1" className="animate-[spin_4s_linear_infinite]" />
                            <circle cx="50" cy="25" r="1" fill="var(--red)" className="animate-ping" style={{ animationDuration: '2s' }} />
                        </svg>
                    </div>
                </CornerPanel>

                {/* Distribution Chart */}
                <CornerPanel className="h-[220px] p-5 flex flex-col">
                    <div className="text-cyan font-mono text-[9px] tracking-[0.2em] font-bold mb-4">THREAT CATEGORY DISTRIBUTION</div>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={alertsData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="1 3" vertical={false} stroke="rgba(0,242,255,0.1)" />
                                <XAxis dataKey="name" stroke="var(--muted)" fontSize={9} fontFamily="monospace" tickLine={false} axisLine={false} tickMargin={8} />
                                <YAxis stroke="var(--muted)" fontSize={9} fontFamily="monospace" tickLine={false} axisLine={false} tickCount={4} />
                                <RechartsTooltip
                                    cursor={{ fill: 'rgba(0,242,255,0.05)' }}
                                    contentStyle={{ background: 'rgba(2,10,20,0.95)', border: '1px solid var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}
                                />
                                <Bar dataKey="count" radius={[2, 2, 0, 0]} maxBarSize={40}>
                                    {alertsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.count > 15 ? 'var(--red)' : entry.count > 10 ? 'var(--orange)' : 'var(--cyan)'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CornerPanel>

            </div>
        </div>
    );
}
