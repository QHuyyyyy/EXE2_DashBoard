import TransactionsOverviewClient from "./TransactionsOverviewClient";

type PropsType = {
    timeFrame?: string;
    className?: string;
};

// Server wrapper that renders client component so data fetching runs in browser
export function TransactionsOverview({ timeFrame = "monthly", className }: PropsType) {
    return <TransactionsOverviewClient timeFrame={timeFrame} className={className} />;
}
