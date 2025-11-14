"use client";

import React from "react";

type DetailItem = {
	username?: string;
	totalAmount?: number;
	/** Optional ISO date for the transaction, used to show the day */
	date?: string;
};

type Props = {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	subtitle?: string;
	items: DetailItem[];
};

function formatVND(value: number) {
	try {
		return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
	} catch {
		return `${value} VND`;
	}
}

function formatFullDate(date?: string) {
	if (!date) return null;
	try {
		const d = new Date(String(date));
		if (!isNaN(d.getTime())) {
			const dd = String(d.getDate()).padStart(2, "0");
			const mm = String(d.getMonth() + 1).padStart(2, "0");
			const yyyy = d.getFullYear();
			return `${dd}/${mm}/${yyyy}`;
		}
	} catch {}
	// Fallback: show raw
	return String(date);
}

export default function RevenueDetailsModal({ isOpen, onClose, title, subtitle, items }: Props) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />

			<div className="relative z-10 w-[92vw] max-w-xl rounded-lg bg-white p-5 shadow-xl dark:bg-gray-dark">
				<div className="mb-3 flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold text-dark dark:text-white">{title ?? "Revenue Details"}</h3>
						{subtitle ? <p className="text-sm text-dark-5 dark:text-dark-6">{subtitle}</p> : null}
					</div>
					<button
						aria-label="Close"
						onClick={onClose}
						className="rounded p-1 text-dark-5 hover:bg-gray-100 hover:text-dark dark:hover:bg-dark-2"
					>
						<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
							<path fill="currentColor" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
						</svg>
					</button>
				</div>

				<div className="max-h-[60vh] overflow-y-auto">
					{(!items || items.length === 0) ? (
						<div className="rounded border border-dashed p-4 text-center text-sm text-dark-5 dark:text-dark-6">
							No transactions found for this period.
						</div>
					) : (
						<ul className="divide-y divide-stroke dark:divide-dark-3">
							{items.map((it, idx) => {
								const fullDate = formatFullDate(it.date);
								return (
									<li key={idx} className="flex items-center justify-between py-3">
										<div className="flex flex-col">
											<span className="text-sm font-medium text-dark dark:text-white">{it.username ?? "(unknown)"}</span>
											{fullDate ? (
												<span className="text-xs text-dark-5 dark:text-dark-6">Ngày {fullDate}</span>
											) : null}
										</div>
										<span className="text-sm text-dark-5 dark:text-dark-6">{formatVND(Number(it.totalAmount ?? 0))}</span>
									</li>
								);
							})}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}

