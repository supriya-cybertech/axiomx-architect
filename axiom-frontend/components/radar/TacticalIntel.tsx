import React from 'react';
import { calcRisk } from '@/lib/riskCalculator';

export const TacticalIntel = ({ activeNeo }: { activeNeo: any }) => {
    if (!activeNeo) return null;

    const score = parseFloat(calcRisk(activeNeo));
    const isCritical = score > 50;
    const isWarning = score > 20;

    const color = isCritical ? 'var(--red)' : isWarning ? 'var(--orange)' : 'var(--green)';
    const textColorClass = isCritical ? 'text-red' : isWarning ? 'text-orange' : 'text-green';
    const bgColorClass = isCritical ? 'bg-red/5' : isWarning ? 'bg-orange/5' : 'bg-green/5';

    let actionLabel = "STAND DOWN";
    if (isCritical) actionLabel = "ACTIVE INTERVENTION REQUIRED";
    else if (isWarning) actionLabel = "ACTIVE MONITORING";

    const v = parseFloat(activeNeo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || "0").toFixed(1);
    const d = parseFloat(activeNeo.close_approach_data?.[0]?.miss_distance?.lunar || "0").toFixed(1);
    const prob = (score / 1000).toFixed(6);

    return (
        <div className="flex-1 w-full min-h-[140px] flex flex-col justify-end">
            <div className="mb-2">
                <span className="font-mono text-[9px] text-muted/70 uppercase tracking-widest pl-1">TACTICAL RECOMMENDATION:</span>
            </div>
            <div className={`w-full p-4 border border-x-0 border-dashed border-t-solid ${bgColorClass}`} style={{ borderTopColor: color, borderBottomColor: `rgba(${isCritical ? '255,0,60' : isWarning ? '255,140,0' : '0,255,157'}, 0.3)` }}>
                <div className={`font-mono text-[11px] font-bold tracking-[0.2em] uppercase ${textColorClass}`} style={{ textShadow: `0 0 8px ${color}` }}>
                    {actionLabel}
                </div>
            </div>
            <div className="mt-4 px-1">
                <p className="font-mono text-[9px] text-white/90 leading-[1.6] tracking-wide text-justify italic font-bold">
                    <span className="not-italic uppercase tracking-widest text-[#fff] mr-2 underline decoration-cyan/50 underline-offset-4">TELEMETRY AUDIT:</span>
                    Object ({activeNeo.name}) approaching at {v} km/s. Miss distance {d} LD {isCritical ? 'violates' : 'exceeds'} terrestrial gravity well threshold. Impact probability: {prob}%.
                </p>
            </div>
        </div>
    );
};
