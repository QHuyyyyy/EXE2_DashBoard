"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import { TransactionsOverviewChart } from "./chart";
import { OverviewCardsSkeleton } from "@/app/dashboard/_components/overview-cards/skeleton";

type PropsType = { timeFrame?: string; className?: string };

function normalizeDaily(data: any): { x: string; y: number }[] {
    if (Array.isArray(data)) {
        return data.map((d: any) => ({ x: String(d.date ?? d.day ?? ""), y: Number(d.daily ?? d.count ?? d.value ?? 0) }));
    }
    if (data && (data.date || data.day)) return [{ x: String(data.date ?? data.day ?? ""), y: Number(data.daily ?? data.count ?? data.value ?? 0) }];
    return [];
}

function normalizeMonthly(data: any): { x: string; y: number }[] {
    if (Array.isArray(data)) {
        return data.map((d: any) => {
            const label = d.month && d.year ? `${d.year}-${String(d.month).padStart(2, "0")}` : d.label ?? `${d.year ?? ""}-${d.month ?? ""}`;
            return { x: label, y: Number(d.monthly ?? d.count ?? d.value ?? 0) };
        });
    }
    if (data && data.month && data.year) return [{ x: `${data.year}-${String(data.month).padStart(2, "0")}`, y: Number(data.monthly ?? data.count ?? data.value ?? 0) }];
    return [];
}

export default function TransactionsOverviewClient({ timeFrame = "monthly", className }: PropsType) {
    const [mode, setMode] = useState<"daily" | "monthly">(timeFrame === "daily" ? "daily" : "monthly");
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<{ x: string; y: number }[]>([]);
    const [placeholder, setPlaceholder] = useState<{ x: string; y: number }[]>([]);

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            try {
                const endpoint = mode === "daily" ? "/Report/transactions/daily" : "/Report/transactions/monthly";
                const res = await api.get(endpoint);
                const data = res?.data;

                console.log("TransactionsOverviewClient fetched", mode, data);

                const tx = mode === "daily" ? normalizeDaily(data) : normalizeMonthly(data);
                const ph = tx.map((d) => ({ x: d.x, y: 0 }));

                if (!mounted) return;
                setTransactions(tx);
                setPlaceholder(ph);
            } catch (err) {
                console.error("TransactionsOverviewClient error", err);
                if (mounted) {
                    setTransactions([]);
                    setPlaceholder([]);
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
                </div>
            </div>

            <TransactionsOverviewChart data={{ transactions, placeholder }} />

            <dl className="grid divide-stroke text-center dark:divide-dark-3 sm:grid-cols-2 sm:divide-x [&>div]:flex [&>div]:flex-col-reverse [&>div]:gap-1">
                <div className="dark:border-dark-3 max-sm:mb-3 max-sm:border-b max-sm:pb-3">
                    <dt className="text-xl font-bold text-dark dark:text-white">{Math.round(transactions.reduce((acc, { y }) => acc + y, 0)).toLocaleString()}</dt>
                    <dd className="font-medium dark:text-dark-6">Total Transactions</dd>
                </div>

                <div>
                    <dt className="text-xl font-bold text-dark dark:text-white">{Math.round(placeholder.reduce((acc, { y }) => acc + y, 0)).toLocaleString()}</dt>
                    <dd className="font-medium dark:text-dark-6">Placeholder</dd>
                </div>
            </dl>
        </div>
    );
}
