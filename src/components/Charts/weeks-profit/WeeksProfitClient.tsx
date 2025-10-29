"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import { WeeksProfitChart } from "./chart";
import { OverviewCardsSkeleton } from "@/app/dashboard/_components/overview-cards/skeleton";

type PropsType = { timeFrame?: string; className?: string };

function normalizeDaily(data: any) {
    if (Array.isArray(data)) return data.map((d: any) => ({ x: d.date ?? d.day ?? "", y: Number(d.daily ?? 0) }));
    if (data && data.date) return [{ x: data.date, y: Number(data.daily ?? 0) }];
    return [];
}

function normalizeMonthly(data: any) {
    if (Array.isArray(data)) return data.map((d: any) => ({ x: `${d.year ?? ""}-${String(d.month ?? "").padStart(2, "0")}`, y: Number(d.monthly ?? 0) }));
    if (data && data.month && data.year) return [{ x: `${data.year}-${String(data.month).padStart(2, "0")}`, y: Number(data.monthly ?? 0) }];
    return [];
}

export default function WeeksProfitClient({ timeFrame, className }: PropsType) {
    const [loading, setLoading] = useState(true);
    const [sales, setSales] = useState<{ x: string; y: number }[]>([]);
    const [revenue, setRevenue] = useState<{ x: string; y: number }[]>([]);
    const [mode, setMode] = useState<string>(timeFrame === "daily" ? "daily" : "monthly");

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            try {
                const endpoint = mode === "daily" ? "/Report/reviews/daily" : "/Report/reviews/monthly";
                const res = await api.get(endpoint);
                const data = res?.data;
                console.log("WeeksProfitClient fetched", mode, data);

                const s = mode === "daily" ? normalizeDaily(data) : normalizeMonthly(data);
                const r = s.map((d) => ({ x: d.x, y: 0 }));

                if (!mounted) return;
                setSales(s);
                setRevenue(r);
            } catch (err) {
                console.error("WeeksProfitClient error", err);
                if (mounted) {
                    setSales([]);
                    setRevenue([]);
                }
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, [mode]);

    if (loading) return <OverviewCardsSkeleton />;

    return (
        <div className={cn("rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card", className)}>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Reviews</h2>

                <div className="flex items-center gap-2">
                    <button
                        className={mode === "daily" ? "px-3 py-1 rounded text-sm bg-blue-600 text-white" : "px-3 py-1 rounded text-sm bg-gray-100"}
                        onClick={() => setMode("daily")}
                    >
                        Daily
                    </button>
                    <button
                        className={mode === "monthly" ? "px-3 py-1 rounded text-sm bg-blue-600 text-white" : "px-3 py-1 rounded text-sm bg-gray-100"}
                        onClick={() => setMode("monthly")}
                    >
                        Monthly
                    </button>
                </div>
            </div>

            <WeeksProfitChart data={{ sales, revenue }} />
        </div>
    );
}
