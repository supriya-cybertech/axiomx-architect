export const calcRisk = (n: any) => {
    const v = parseFloat(n.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second || "0");
    const d = parseFloat(n.close_approach_data?.[0]?.miss_distance?.lunar || "Infinity");
    const s = parseFloat(n.estimated_diameter?.kilometers?.estimated_diameter_max || "0");
    let score = (v / 30) * 40 + (1 / d) * 40 + (s / 1) * 20;
    return Math.min(100, Math.max(0, score)).toFixed(1);
};
