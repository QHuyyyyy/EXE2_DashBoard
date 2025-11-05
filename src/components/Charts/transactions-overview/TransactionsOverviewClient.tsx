"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import { TransactionsOverviewChart } from "./chart";
import { OverviewCardsSkeleton } from "@/app/dashboard/_components/overview-cards/skeleton";

type PropsType = { timeFrame?: string; className?: string };

function normalizeDaily(data: any): { x: string; y: number }[] {
    // Accept array or object with `daily` array
    let items: any[] = [];
    if (!data) return [];
    if (Array.isArray(data)) items = data;
    else if (Array.isArray(data.daily)) items = data.daily;
    else if (data && (data.date || data.day)) items = [data];

    return items.map((d: any) => {
        const raw = d.date ?? d.day ?? "";
        let label = String(raw);
        try {
            if (raw) label = dayjs(String(raw)).isValid() ? dayjs(String(raw)).format("DD") : String(raw);
        } catch (e) {
            label = String(raw);
        }
        return { x: label, y: Number(d.transactions ?? d.daily ?? d.count ?? d.value ?? 0) };
    });
}

function normalizeMonthly(data: any): { x: string; y: number }[] {
    // Handle array, object with `monthly` array, or single-month object
    if (Array.isArray(data)) {
        return data.map((d: any) => {
            const label = d.monthName ?? (d.month && d.year ? `${d.year}-${String(d.month).padStart(2, "0")}` : d.label ?? `${d.year ?? ""}-${d.month ?? ""}`);
            return { x: label, y: Number(d.transactions ?? d.monthly ?? d.count ?? d.value ?? 0) };
        });
    }

    if (data && Array.isArray(data.monthly)) {
        return data.monthly.map((d: any) => {
            const label = d.monthName ?? (d.month && data.year ? `${data.year}-${String(d.month).padStart(2, "0")}` : d.label ?? `${data.year ?? ""}-${d.month ?? ""}`);
            return { x: label, y: Number(d.transactions ?? d.monthly ?? d.count ?? d.value ?? 0) };
        });
    }

    if (data && data.month && data.year) {
        const label = data.monthName ?? `${data.year}-${String(data.month).padStart(2, "0")}`;
        return [{ x: label, y: Number(data.transactions ?? data.monthly ?? data.count ?? data.value ?? 0) }];
    }

    return [];
}

export default function TransactionsOverviewClient({ timeFrame = "monthly", className }: PropsType) {
    const [mode, setMode] = useState<"daily" | "monthly">(timeFrame === "daily" ? "daily" : "monthly");
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<{ x: string; y: number }[]>([]);

    // optional month/year selectors (month shown only for daily)
    const now = new Date();
    const [month, setMonth] = useState<string>(String(now.getMonth() + 1));
    const [year, setYear] = useState<number>(now.getFullYear());

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            try {
                const endpoint = mode === "daily" ? "/Report/transactions/daily" : "/Report/transactions/monthly";

                const params: any = {};
                if (mode === "daily") {
                    if (month) params.month = Number(month);
                    if (year) params.year = year;
                } else {
                    if (year) params.year = year;
                }

                const res = await api.get(endpoint, { params: Object.keys(params).length ? params : undefined });
                const data = res?.data;

                console.log("TransactionsOverviewClient fetched", mode, data);

                const tx = mode === "daily" ? normalizeDaily(data) : normalizeMonthly(data);

                if (!mounted) return;
                setTransactions(tx);
            } catch (err) {
                console.error("TransactionsOverviewClient error", err);
                if (mounted) {
                    setTransactions([]);
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
        <div
            className={cn(
                "grid gap-2 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
                className,
            )}
        >
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Transactions Overview</h2>

                <div className="flex items-center gap-2">
                    <button
                        className={cn("px-3 py-1 rounded text-sm", mode === "daily" ? "bg-gold-600 text-white" : "bg-gray-100")}
                        onClick={() => setMode("daily")}
                    >
                        Daily
                    </button>
                    <button
                        className={cn("px-3 py-1 rounded text-sm", mode === "monthly" ? "bg-gold-600 text-white" : "bg-gray-100")}
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

            <TransactionsOverviewChart data={{ transactions }} />

            <dl className="grid divide-stroke text-center dark:divide-dark-3 [&>div]:flex [&>div]:flex-col-reverse [&>div]:gap-1">
                <div className="dark:border-dark-3 max-sm:mb-3 max-sm:border-b max-sm:pb-3">
                    <dt className="text-xl font-bold text-dark dark:text-white">{Math.round(transactions.reduce((acc, { y }) => acc + y, 0)).toLocaleString()}</dt>
                    <dd className="font-medium dark:text-dark-6">Total Transactions</dd>
                </div>


            </dl>
        </div>
    );
}
