import React, { useEffect, useRef } from 'react';
import { calcRisk } from '@/lib/riskCalculator';

export const RadarCanvas = ({ neoData, activeNeo }: { neoData: any[], activeNeo: any }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let frameId: number;
        let angle = 0;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const maxR = Math.min(cx, cy) - 10;

            // Rings
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
            for (let i = 1; i <= 4; i++) {
                ctx.beginPath();
                ctx.arc(cx, cy, maxR * (i / 4), 0, Math.PI * 2);
                ctx.stroke();
            }

            // Crosshairs
            ctx.beginPath();
            ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR);
            ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy);
            ctx.stroke();

            // Sweep
            angle = (angle + 0.02) % (Math.PI * 2);
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, maxR, angle, angle + 0.5);
            ctx.lineTo(cx, cy);
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
            grad.addColorStop(0, 'rgba(0, 212, 255, 0)');
            grad.addColorStop(1, 'rgba(0, 212, 255, 0.4)');
            ctx.fillStyle = grad;
            ctx.fill();

            // Earth
            ctx.beginPath();
            ctx.arc(cx, cy, 4, 0, Math.PI * 2);
            ctx.fillStyle = 'var(--cyan)';
            ctx.fill();

            // NEOs
            neoData.forEach((n, i) => {
                const dist = parseFloat(n.close_approach_data?.[0]?.miss_distance?.lunar || "100");
                const score = parseFloat(calcRisk(n));
                const r = maxR * Math.min(dist / 100, 1);
                const theta = (i * Math.PI * 2 / Math.max(neoData.length, 1)) + (Date.now() / 10000 % Math.PI * 2);
                const x = cx + r * Math.cos(theta);
                const y = cy + r * Math.sin(theta);

                ctx.beginPath();
                ctx.arc(x, y, n.id === activeNeo?.id ? 5 : 3, 0, Math.PI * 2);
                ctx.fillStyle = score > 50 ? 'var(--red)' : score > 20 ? 'var(--orange)' : 'var(--green)';
                ctx.fill();

                if (n.id === activeNeo?.id) {
                    ctx.strokeStyle = 'var(--cyan)';
                    ctx.stroke();
                }
            });

            frameId = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(frameId);
    }, [neoData, activeNeo]);

    return <canvas ref={canvasRef} width={400} height={400} style={{ maxWidth: '100%', maxHeight: '100%' }} />;
};
