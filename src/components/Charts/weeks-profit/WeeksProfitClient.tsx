"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import { WeeksProfitChart } from "./chart";
import { OverviewCardsSkeleton } from "@/app/dashboard/_components/overview-cards/skeleton";

type PropsType = { timeFrame?: string; className?: string };

function normalizeDaily(data: any) {
    // Support either array of items or { daily: [...] }
    let items: any[] = [];
    if (!data) return [];
    if (Array.isArray(data)) items = data;
    else if (Array.isArray(data.daily)) items = data.daily;
    else if (data && data.date) items = [data];

    return items.map((d: any) => {
        const raw = d.date ?? d.day ?? "";
        let label = String(raw);
        try {
            if (raw) label = dayjs(String(raw)).isValid() ? dayjs(String(raw)).format("DD") : String(raw);
        } catch (e) {
            label = String(raw);
        }
        return { x: label, y: Number(d.reviews ?? d.daily ?? 0), raw: raw };
    });
}

function normalizeMonthly(data: any) {
    // Handle array, object with `monthly` array, or single-month object
    if (!data) return [];
    if (Array.isArray(data)) {
        return data.map((d: any) => ({ x: d.monthName ?? (d.month && d.year ? `${d.year}-${String(d.month).padStart(2, "0")}` : d.label ?? `${d.year ?? ""}-${d.month ?? ""}`), y: Number(d.reviews ?? d.monthly ?? 0), raw: d.monthName ?? (d.month && d.year ? `${d.year}-${String(d.month).padStart(2, "0")}` : d.label ?? `${d.year ?? ""}-${d.month ?? ""}`) }));
    }
    if (Array.isArray(data.monthly)) {
        return data.monthly.map((d: any) => ({ x: d.monthName ?? (d.month && data.year ? `${data.year}-${String(d.month).padStart(2, "0")}` : d.label ?? `${data.year ?? ""}-${d.month ?? ""}`), y: Number(d.reviews ?? d.monthly ?? 0), raw: d.monthName ?? (d.month && data.year ? `${data.year}-${String(d.month).padStart(2, "0")}` : d.label ?? `${data.year ?? ""}-${d.month ?? ""}`) }));
    }
    if (data && data.month && data.year) return [{ x: data.monthName ?? `${data.year}-${String(data.month).padStart(2, "0")}`, y: Number(data.reviews ?? data.monthly ?? 0), raw: data.monthName ?? `${data.year}-${String(data.month).padStart(2, "0")}` }];
    return [];
}

export default function WeeksProfitClient({ timeFrame, className, onDateClick }: PropsType & { onDateClick?: (date: string) => void }) {
    const [loading, setLoading] = useState(true);
    const [sales, setSales] = useState<{ x: string; y: number }[]>([]);
    const [revenue, setRevenue] = useState<{ x: string; y: number }[]>([]);
    const [mode, setMode] = useState<string>(timeFrame === "daily" ? "daily" : "monthly");

    // optional month/year selectors
    const now = new Date();
    const [month, setMonth] = useState<string>(String(now.getMonth() + 1));
    const [year, setYear] = useState<number>(now.getFullYear());

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            try {
                const endpoint = mode === "daily" ? "/Report/reviews/daily" : "/Report/reviews/monthly";

                const params: any = {};
                if (mode === "daily") {
                    if (month) params.month = Number(month);
                    if (year) params.year = year;
                } else {
                    if (year) params.year = year;
                }

                const res = await api.get(endpoint, { params: Object.keys(params).length ? params : undefined });
                const data = res?.data;
                console.log("WeeksProfitClient fetched", mode, data);

                const s = mode === "daily" ? normalizeDaily(data) : normalizeMonthly(data);
                const r = s.map((d: { x: string; y: number }) => ({ x: d.x, y: 0 }));

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
    }, [mode, month, year]);

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

                    <div className="flex items-center gap-2 ml-3">
                        {mode === "daily" && (
                            <>
                                <label className="text-sm">Month:</label>
                                <select
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    className="rounded border px-2 py-1 text-sm"
                                >
                                    <option value="">All</option>
                                    <option value="1">Jan</option>
                                    <option value="2">Feb</option>
                                    <option value="3">Mar</option>
                                    <option value="4">Apr</option>
                                    <option value="5">May</option>
                                    <option value="6">Jun</option>
                                    <option value="7">Jul</option>
                                    <option value="8">Aug</option>
                                    <option value="9">Sep</option>
                                    <option value="10">Oct</option>
                                    <option value="11">Nov</option>
                                    <option value="12">Dec</option>
                                </select>
                            </>
                        )}

                        <label className="text-sm">Year:</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value || now.getFullYear()))}
                            className="w-20 rounded border px-2 py-1 text-sm"
                        />
                    </div>
                </div>
            </div>

            <WeeksProfitChart data={{ sales }} onBarClick={(raw) => onDateClick?.(raw)} />
        </div>
    );
}
