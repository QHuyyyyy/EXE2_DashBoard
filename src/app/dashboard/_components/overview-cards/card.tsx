import { ArrowDownIcon, ArrowUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import type { JSX, SVGProps, ReactNode } from "react";

type PropsType = {
  label: string;
  data: {
    value: number | string;
    growthRate: number;
  };
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  /** When false, hide the percent growth UI */
  showGrowth?: boolean;
  onClick?: () => void;
  /** Optional extra node rendered next to the growth block (e.g. star rating) */
  meta?: ReactNode;
};

export function OverviewCard({ label, data, Icon, showGrowth = true, onClick, meta }: PropsType) {
  const isDecreasing = data.growthRate < 0;

  return (
    <div
      role={"button"}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") (e.target as HTMLElement).click();
      }}
      onClick={onClick}
      className={(onClick ? "cursor-pointer " : "") + "rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"}
    >
      <Icon />

      <div className="mt-6 flex items-end justify-between">
        <dl>
          <dt className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
            {data.value}
          </dt>

          <dd className="text-sm font-medium text-dark-6">{label}</dd>
        </dl>

        <div className="flex items-center gap-3">
          {/* optional meta node (e.g. star rating) */}
          {meta ? <div className="flex items-center">{meta}</div> : null}

          {/** optional growth display */}
          {/** showGrowth default is true when omitted */}
          {showGrowth && (
            <dl
              className={cn(
                "text-sm font-medium",
                isDecreasing ? "text-red" : "text-green",
              )}
            >
              <dt className="flex items-center gap-1.5">
                {data.growthRate}%
                {isDecreasing ? (
                  <ArrowDownIcon aria-hidden />
                ) : (
                  <ArrowUpIcon aria-hidden />
                )}
              </dt>

              <dd className="sr-only">
                {label} {isDecreasing ? "Decreased" : "Increased"} by{" "}
                {data.growthRate}%
              </dd>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
}
