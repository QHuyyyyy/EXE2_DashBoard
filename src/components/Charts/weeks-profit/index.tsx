import WeeksProfitClient from "./WeeksProfitClient";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

// Server wrapper that renders the client component so the reviews chart
// fetches data from the browser (uses client axios `api`).
export function WeeksProfit({ className, timeFrame }: PropsType) {
  return <WeeksProfitClient className={className} timeFrame={timeFrame} />;
}
