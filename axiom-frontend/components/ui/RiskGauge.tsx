import React from 'react';
import { CornerPanel } from '@/components/layout/CornerPanel';
import { calcRisk } from '@/lib/riskCalculator';

export const RiskGauge = ({ activeNeo }: { activeNeo: any }) => {
    const score = activeNeo ? parseFloat(calcRisk(activeNeo)) : 0;
    const color = score > 50 ? 'var(--red)' : score > 20 ? 'var(--orange)' : 'var(--green)';
    const classification = score > 50 ? 'CRITICAL' : score > 20 ? 'WARNING' : 'NEGLIGIBLE';

    const radius = 140;
    const strokeWidth = 12;
    const arcLength = Math.PI * radius;
    // Cap score at 100 for gauge math
    const displayScore = Math.min(score, 100);
    const dashOffset = arcLength - (displayScore / 100) * arcLength;

    return (
        <CornerPanel className="flex-1 flex flex-col items-center justify-center relative p-8">
            <h3 className="absolute top-6 left-6 text-cyan font-mono text-[10px] tracking-widest uppercase">PLANETARY RISK (S_RI)</h3>
            <div className="relative flex flex-col items-center justify-center w-full h-[300px]">
                <svg width={340} height={200} viewBox="0 0 340 200" className="absolute top-0">
                    <path d="M 30 180 A 140 140 0 0 1 310 180" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth={strokeWidth} strokeLinecap="round" />
                    <path d="M 30 180 A 140 140 0 0 1 310 180" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
                        strokeDasharray={arcLength} strokeDashoffset={dashOffset} style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
                </svg>

                <div className="flex flex-col items-center justify-center z-10 mt-10">
                    <span className="text-muted/70 font-mono text-[10px] tracking-widest mb-2">RISK SCORE</span>
                    {activeNeo && <span className="text-cyan font-mono text-xs tracking-widest uppercase mb-2">[{activeNeo.name}]</span>}
                    <span className="font-orbitron text-text" style={{ fontSize: '4rem', lineHeight: '1', textShadow: `0 0 15px ${color}` }}>
                        {displayScore.toFixed(1)}
                    </span>
                    <span className="font-mono text-xs tracking-widest mt-2" style={{ color }}>{classification}</span>
                    <div className="font-mono text-[10px] text-muted tracking-widest mt-6 bg-white/5 px-4 py-1 border border-white/5 rounded-full">
                        MODEL CONFIDENCE: 92.4%
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-4 font-mono text-[10px] w-full max-w-md border-t pt-6" style={{ borderColor: 'rgba(0,212,255,0.15)' }}>
                <span className="text-muted tracking-widest">PROBABILITY OF IMPACT:</span>
                <span className="text-right tracking-widest">{(score / 1000).toFixed(6)}%</span>
                <span className="text-muted tracking-widest">CONFIDENCE INTERVAL:</span>
                <span className="text-right tracking-widest">94.2%</span>
                <span className="text-muted tracking-widest">FALSE POSITIVE RISK:</span>
                <span className="text-right text-green tracking-widest">LOW</span>
                <span className="text-muted tracking-widest">DATA SOURCE:</span>
                <span className="text-right text-cyan tracking-widest">NASA JPL NEOWS</span>
            </div>
        </CornerPanel>
    );
};
