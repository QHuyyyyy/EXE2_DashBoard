"use client";

import React, { useEffect, useState } from "react";
import { compactFormat, formatVND } from "@/lib/format-number";
import { OverviewCard } from "./card";
import * as icons from "./icons";
import api from "@/services/api";
import { OverviewCardsSkeleton } from "./skeleton";

type Metric = { value: number; growthRate: number };

export default function OverviewCardsClient() {
    const [loading, setLoading] = useState(true);
    const [revenue, setRevenue] = useState<Metric>({ value: 0, growthRate: 0 });
    const [subcriptions, setSubcriptions] = useState<Metric>({ value: 0, growthRate: 0 });
    const [transactions, setTransactions] = useState<Metric>({ value: 0, growthRate: 0 });
    const [reviews, setReviews] = useState<Metric>({ value: 0, growthRate: 0 });
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
                const us = userRes?.data?.total ?? userRes?.data ?? 0;

                console.log("OverviewCardsClient fetched", { rev, subs, tx, revw, us });

                if (!mounted) return;

                setRevenue({ value: Number(rev) || 0, growthRate: 0 });
                setSubcriptions({ value: Number(subs) || 0, growthRate: 0 });
                setTransactions({ value: Number(tx) || 0, growthRate: 0 });
                setReviews({ value: Number(revw) || 0, growthRate: 0 });
                setUsers({ value: Number(us) || 0, growthRate: 0 });
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
            />
        </div>
    );
}
