"use client";
import { useState, useEffect } from 'react';

export const useNASAData = () => {
    const [neoData, setNeoData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNeoData = async () => {
            setLoading(true);
            try {
                const today = new Date().toISOString().split('T')[0];
                const key = process.env.NEXT_PUBLIC_NASA_KEY || 'DEMO_KEY';
                const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${key}`);
                const data = await res.json();
                const neos = data?.near_earth_objects?.[today] || [];
                setNeoData(neos);
            } catch (err) {
                console.error("NASA API Error", err);
                setNeoData([]); // Fallback
            } finally {
                setLoading(false);
            }
        };
        fetchNeoData();
    }, []);

    return { neoData, loading };
};
