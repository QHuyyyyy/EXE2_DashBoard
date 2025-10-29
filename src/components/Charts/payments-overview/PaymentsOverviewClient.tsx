"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { standardFormat, formatVND } from "@/lib/format-number";
import api from "@/services/api";
import { PaymentsOverviewChart } from "./chart";
import { OverviewCardsSkeleton } from "@/app/dashboard/_components/overview-cards/skeleton";

type PropsType = { timeFrame?: string; className?: string };

function normalizeDaily(data: any): { x: string; y: number }[] {
    // Accept array or single object
    if (Array.isArray(data)) {
        return data.map((d: any) => ({ x: String(d.date ?? d.day ?? ""), y: Number(d.revenue ?? 0) }));
    }
    if (data && data.date) return [{ x: String(data.date), y: Number(data.revenue ?? 0) }];
    return [];
}

function normalizeMonthly(data: any): { x: string; y: number }[] {
    if (Array.isArray(data)) {
        return data.map((d: any) => {
            const label = d.month && d.year ? `${d.year}-${String(d.month).padStart(2, "0")}` : d.label ?? `${d.year ?? ""}-${d.month ?? ""}`;
            return { x: label, y: Number(d.revenue ?? 0) };
        });
    }
    if (data && data.month && data.year) return [{ x: `${data.year}-${String(data.month).padStart(2, "0")}`, y: Number(data.revenue ?? 0) }];
    return [];
}

export default function PaymentsOverviewClient({ timeFrame = "monthly", className }: PropsType) {
    const [mode, setMode] = useState<"daily" | "monthly">(timeFrame === "daily" ? "daily" : "monthly");
    const [loading, setLoading] = useState(true);
    const [received, setReceived] = useState<{ x: string; y: number }[]>([]);
    const [due, setDue] = useState<{ x: string; y: number }[]>([]);

    useEffect(() => {
        let mounted = true;

        async function load() {
            setLoading(true);
            try {
                const endpoint = mode === "daily" ? "/Report/revenue/daily" : "/Report/revenue/monthly";
                const res = await api.get(endpoint);
                const data = res?.data;

                console.log("PaymentsOverviewClient fetched", mode, data);

                const rec = mode === "daily" ? normalizeDaily(data) : normalizeMonthly(data);
                const dueData = rec.map((d) => ({ x: d.x, y: 0 }));

                if (!mounted) return;
                setReceived(rec);
                setDue(dueData);
            } catch (err) {
                console.error("PaymentsOverviewClient error", err);
                if (mounted) {
                    setReceived([]);
                    setDue([]);
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
                <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Revenue Overview</h2>

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

            <PaymentsOverviewChart data={{ received, due }} />

            <dl className="grid divide-stroke text-center dark:divide-dark-3 sm:grid-cols-2 sm:divide-x [&>div]:flex [&>div]:flex-col-reverse [&>div]:gap-1">
                <div className="dark:border-dark-3 max-sm:mb-3 max-sm:border-b max-sm:pb-3">
                    <dt className="text-xl font-bold text-dark dark:text-white">{formatVND(received.reduce((acc, { y }) => acc + y, 0))}</dt>
                    <dd className="font-medium dark:text-dark-6">Received Amount</dd>
                </div>

                <div>
                    <dt className="text-xl font-bold text-dark dark:text-white">{formatVND(due.reduce((acc, { y }) => acc + y, 0))}</dt>
                    <dd className="font-medium dark:text-dark-6">Due Amount</dd>
                </div>
            </dl>
        </div>
    );
}
