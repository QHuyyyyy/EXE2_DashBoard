"use client";

import { useEffect, useState } from "react";
import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/lib/utils";
import api from "@/services/api";
import { DonutChart } from "./chart";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

export function UsedDevices({ timeFrame = "monthly", className }: PropsType) {
  const [data, setData] = useState<{ name: string; amount: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const resp = await api.get(`/Report/subscriptions/total-by-plan`);
        const payload = resp.data;

        if (Array.isArray(payload)) {
          const chartData = payload.map((p: any) => ({
            name: p.name ?? `Plan ${p.planId ?? ""}`,
            amount: Number(p.total ?? p.amount ?? 0),
          }));

          if (mounted) setData(chartData);
        } else {
          if (mounted) setData([]);
        }
      } catch (err: any) {
        // Log and store a friendly error message
        // eslint-disable-next-line no-console
        console.error("Failed to load subscriptions by plan:", err);
        if (mounted) setError("Unable to load subscription data");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [timeFrame]);

  return (
    <div
      className={cn(
        "grid grid-cols-1 grid-rows-[auto_1fr] gap-9 rounded-[10px] bg-white p-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Subscription
        </h2>

        <PeriodPicker defaultValue={timeFrame} sectionKey="used_devices" />
      </div>

      <div className="grid place-items-center">
        {loading ? null : error ? <div className="text-sm text-red-500">{error}</div> : <DonutChart data={data} />}
      </div>
    </div>
  );
}
