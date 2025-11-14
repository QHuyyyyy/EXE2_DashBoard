"use client";

import React, { useEffect, useState } from "react";
import { compactFormat, formatVND } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import api from "@/services/api";
import { OverviewCardsSkeleton } from "./skeleton";

type Metric = { value: number; growthRate: number };

export default function OverviewCardsClient({ onReviewsClick }: { onReviewsClick?: (params?: { year?: number; month?: number; date?: string }) => void } = {}) {
    const [loading, setLoading] = useState(true);
    const [revenue, setRevenue] = useState<Metric>({ value: 0, growthRate: 0 });
    const [subcriptions, setSubcriptions] = useState<Metric>({ value: 0, growthRate: 0 });
    const [transactions, setTransactions] = useState<Metric>({ value: 0, growthRate: 0 });
    const [reviews, setReviews] = useState<Metric>({ value: 0, growthRate: 0 });
    const [reviewsAvg, setReviewsAvg] = useState<number | null>(null);
    const [users, setUsers] = useState<Metric>({ value: 0, growthRate: 0 });

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const [revRes, subRes, txRes, revwRes, userRes] = await Promise.all([
                    api.get("/Report/revenue/total"),
                    api.get("/Report/subscriptions/total"),
                    api.get("/Report/transactions/total"),
                    api.get("/Report/reviews/total"),
                    api.get("/Report/users/total"),
                ]);

                // Extract known shapes
                const rev = revRes?.data?.total ?? revRes?.data ?? 0;
                const subs = subRes?.data?.total ?? subRes?.data ?? 0;
                const tx = txRes?.data?.total ?? txRes?.data ?? 0;
                const revw = revwRes?.data?.total ?? revwRes?.data ?? 0;
                // Try to read an average rating if provided by the API
                const avg = revwRes?.data?.averageRating ?? revwRes?.data?.avg ?? revwRes?.data?.average ?? revwRes?.data?.rating?.average ?? null;
                const us = userRes?.data?.total ?? userRes?.data ?? 0;

                console.log("OverviewCardsClient fetched", { rev, subs, tx, revw, us });

                if (!mounted) return;

                setRevenue({ value: Number(rev) || 0, growthRate: 0 });
                setSubcriptions({ value: Number(subs) || 0, growthRate: 0 });
                setTransactions({ value: Number(tx) || 0, growthRate: 0 });
                setReviews({ value: Number(revw) || 0, growthRate: 0 });
                setUsers({ value: Number(us) || 0, growthRate: 0 });
                setReviewsAvg(avg ? Number(avg) : null);
            } catch (err) {
                console.error("OverviewCardsClient load error", err);
            } finally {
                if (mounted) setLoading(false);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, []);

    if (loading) return <OverviewCardsSkeleton />;

    return (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <OverviewCard
                label="Total Revenues"
                data={{ ...revenue, value: formatVND(revenue.value) }}
                Icon={icons.Views}
                showGrowth={false}
            />

            <OverviewCard
                label="Total Subscriptions"
                data={{ ...subcriptions, value: compactFormat(subcriptions.value) }}
                Icon={icons.Product}
                showGrowth={false}
            />

            <OverviewCard
                label="Total Transactions"
                data={{ ...transactions, value: compactFormat(transactions.value) }}
                Icon={icons.Profit}
                showGrowth={false}
            />

            <OverviewCard
                label="Total Reviews"
                data={{ ...reviews, value: compactFormat(reviews.value) }}
                Icon={icons.Users}
                showGrowth={false}
                onClick={() => onReviewsClick?.()}
                meta={reviewsAvg ? (
                    <div className="flex items-center gap-2 text-yellow-500">
                        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="flex-shrink-0">
                            <path
                                fill="currentColor"
                                d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                            />
                        </svg>
                        <span className="font-medium text-sm text-gray-800">{reviewsAvg?.toFixed(1)}</span>
                    </div>
                ) : null}
            />
        </div>
    );
}
