"use client";
import React, { useState } from 'react';
import { useNASAData } from '@/hooks/useNASAData';
import { RadarCanvas } from '@/components/radar/RadarCanvas';
import { TelemetryPanel } from '@/components/radar/TelemetryPanel';
import { TacticalIntel } from '@/components/radar/TacticalIntel';
import { CornerPanel } from '@/components/layout/CornerPanel';

export default function RadarPage() {
    const { neoData, loading } = useNASAData();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const activeNeo = selectedId ? neoData.find(n => n.id === selectedId) : neoData[1] || neoData[0]; // match screenshot default target

    return (
        <div className="flex gap-4 h-full p-2" style={{ height: 'calc(100vh - 120px)' }}>
            {/* Left side: Radar (65%) */}
            <div className="flex-[1.8] flex flex-col relative h-full gap-2">
                <div className="text-cyan font-mono text-[10px] tracking-widest pl-2 flex items-center gap-2">
                    <div className="w-1 h-3 bg-cyan"></div>
                    <span className="font-bold">SCANNING SECTOR 0-X // </span>
                    <span className="animate-pulse">ACTIVE</span>
                </div>
                <CornerPanel className="flex-1 flex items-center justify-center relative cursor-crosshair overflow-hidden" onClick={() => {
                    if (!neoData.length) return;
                    const curIdx = activeNeo ? neoData.findIndex(n => n.id === activeNeo.id) : -1;
                    const nextIdx = (curIdx + 1) % neoData.length;
                    setSelectedId(neoData[nextIdx].id);
                }}>
                    <RadarCanvas neoData={neoData} activeNeo={activeNeo} />
                </CornerPanel>
            </div>

            {/* Right side: Telemetry & Intel (35%) */}
            <CornerPanel className="w-[380px] flex-shrink-0 flex flex-col gap-6 p-6 h-full border-t-[3px] border-t-cyan">
                {/* Custom top right decorative cutoff using absolute border */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-bg bg-bg z-10" style={{ transform: 'translate(2px, -2px)' }}>
                    <div className="absolute top-0 right-0 w-12 h-1 border-b-[3px] border-cyan origin-top-right rotate-45" style={{ transform: 'translate(4px, 12px)' }}></div>
                </div>

                <TelemetryPanel activeNeo={activeNeo} loading={loading} />
                <TacticalIntel activeNeo={activeNeo} />
            </CornerPanel>
        </div>
    );
}
