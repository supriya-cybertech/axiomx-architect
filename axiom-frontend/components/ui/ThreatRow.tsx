import React from 'react';
import { calcRisk } from '@/lib/riskCalculator';

export const ThreatRow = ({ n }: { n: any }) => {
    const score = parseFloat(calcRisk(n));
    const v = parseFloat(n.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || "0");
    const d = parseFloat(n.close_approach_data?.[0]?.miss_distance?.lunar || "0");

    let color = 'var(--green)';
    let textClass = 'text-green';
    let label = 'NEGLIGIBLE';

    if (score > 50) {
        color = 'var(--red)';
        textClass = 'text-red';
        label = 'CRITICAL';
    } else if (score > 20) {
        color = 'var(--orange)';
        textClass = 'text-orange';
        label = 'WATCH';
    }

    return (
        <div className="flex justify-between items-center py-4 border-b border-cyan/10 last:border-0">
            <div className="flex flex-col gap-2">
                <span className="mono font-bold text-[11px] tracking-widest text-cyan font-orbitron">{n.name}</span>
                <span className="mono text-[10px] text-muted/70 font-bold tracking-widest uppercase">{d.toFixed(1)} LD</span>
            </div>
            <div className="flex flex-col gap-2 text-right">
                <span className={`mono text-[10px] font-bold tracking-[0.1em] ${textClass}`}>{label}</span>
                <span className="mono text-[10px] text-muted/70 font-bold tracking-widest uppercase">{v.toFixed(1)} km/s</span>
            </div>
        </div>
    );
};
