import PaymentsOverviewClient from "./PaymentsOverviewClient";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

// Server wrapper that renders client component so data fetching runs in browser
export function PaymentsOverview({ timeFrame = "monthly", className }: PropsType) {
  return <PaymentsOverviewClient timeFrame={timeFrame} className={className} />;
}
