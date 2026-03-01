import React from 'react';
import { calcRisk } from '@/lib/riskCalculator';

export const TelemetryPanel = ({ activeNeo, loading }: { activeNeo: any, loading: boolean }) => {
    const score = activeNeo ? parseFloat(calcRisk(activeNeo)) : 0;
    const classification = score > 50 ? 'CRITICAL' : score > 20 ? 'WARNING' : 'NEGLIGIBLE';
    const color = score > 50 ? 'var(--red)' : score > 20 ? 'var(--orange)' : 'var(--green)';
    const textColorClass = score > 50 ? 'text-red' : score > 20 ? 'text-orange' : 'text-green';

    return (
        <div className="flex-[1.5] mono flex flex-col gap-5 relative border-b border-cyan/20 pb-6 w-full mt-2">
            {loading ? (
                <div className="text-cyan text-[10px] text-center w-full animate-pulse tracking-widest mt-10">CALIBRATING SENSORS...</div>
            ) : activeNeo ? (
                <>
                    <div className="flex justify-between items-center text-cyan uppercase tracking-widest text-[11px] mb-2 font-bold">
                        <span className="opacity-70">TELEMETRY ID:</span>
                        <span>{activeNeo.id}</span>
                    </div>

                    <div className="flex flex-col gap-5 uppercase tracking-widest text-[10px]">
                        <div className="flex justify-between items-center border-b border-dashed border-cyan/10 pb-1">
                            <span className="text-muted/70">NAME:</span>
                            <span className="text-white/90 font-bold">({activeNeo.name})</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-cyan/10 pb-1">
                            <span className="text-muted/70">VELOCITY:</span>
                            <span className="text-white/90 font-bold tracking-widest">{parseFloat(activeNeo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || "0").toFixed(2)} km/s</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-cyan/10 pb-1">
                            <span className="text-muted/70">DIAMETER:</span>
                            <span className="text-white/90 font-bold tracking-widest">{parseFloat(activeNeo.estimated_diameter?.kilometers?.estimated_diameter_min || "0").toFixed(3)} - {parseFloat(activeNeo.estimated_diameter?.kilometers?.estimated_diameter_max || "0").toFixed(3)} km</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-cyan/10 pb-1">
                            <span className="text-muted/70">MISS DIST:</span>
                            <span className="text-white/90 font-bold tracking-[0.1em]">{parseFloat(activeNeo.close_approach_data?.[0]?.miss_distance?.kilometers || "0").toLocaleString('en-IN', { maximumFractionDigits: 3 })} km</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-cyan/10 pb-1">
                            <span className="text-muted/70">LUNAR DIST:</span>
                            <span className="text-white/90 font-bold tracking-[0.1em]">{parseFloat(activeNeo.close_approach_data?.[0]?.miss_distance?.lunar || "0").toFixed(2)} LD</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-dashed border-cyan/10 pb-1 mt-1">
                            <span className="text-muted/70">RISK INDEX (S_RI):</span>
                            <span className={`font-bold text-[11px] ${textColorClass} tracking-[0.2em]`} style={{ textShadow: `0 0 8px ${color}` }}>{score.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-muted/70">CLASSIFICATION:</span>
                            <span className={`font-bold text-[11px] ${textColorClass} tracking-[0.2em]`} style={{ textShadow: `0 0 8px ${color}` }}>{classification}</span>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};
