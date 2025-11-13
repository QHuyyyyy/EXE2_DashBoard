"use client";

import React, { useState } from "react";
import OverviewCardsClient from "./overview-cards/OverviewCardsClient";
import WeeksProfitClient from "@/components/Charts/weeks-profit/WeeksProfitClient";
import ReviewsModal from "@/components/Review/ReviewsModal";

export default function DashboardInteractive() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalParams, setModalParams] = useState<{ year?: number; month?: number; date?: string } | null>(null);

    function openModalWith(params?: { year?: number; month?: number; date?: string }) {
        setModalParams(params ?? null);
        setIsModalOpen(true);
    }

    return (
        <>
            <OverviewCardsClient onReviewsClick={() => openModalWith()} />

            <div className="mt-4">
                <WeeksProfitClient onDateClick={(raw) => {
                    // raw may be a full ISO date or a label; pass as date param
                    openModalWith({ date: raw });
                }} />
            </div>

            <ReviewsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                year={modalParams?.year}
                month={modalParams?.month}
                date={modalParams?.date}
            />
        </>
    );
}
