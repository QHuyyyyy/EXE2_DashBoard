import { PaymentsOverview } from "@/components/Charts/payments-overview";
import { TransactionsOverview } from "@/components/Charts/transactions-overview";
import { UsedDevices } from "@/components/Charts/used-devices";
import DashboardInteractive from "./_components/DashboardInteractive";
// TopChannels removed from dashboard view
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import FullReviewsSection from "./_components/FullReviewsSection";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <DashboardInteractive />
      </Suspense>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <PaymentsOverview
          className="col-span-12 xl:col-span-12"
          key={extractTimeFrame("payments_overview")}
          timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
        />

        <TransactionsOverview
          className="col-span-12 xl:col-span-7"
          key={extractTimeFrame("transactions_overview")}
          timeFrame={extractTimeFrame("transactions_overview")?.split(":")[1]}
        />

        <UsedDevices
          className="col-span-12 xl:col-span-5"
          key={extractTimeFrame("used_devices")}
          timeFrame={extractTimeFrame("used_devices")?.split(":")[1]}
        />

        {/* Full reviews list */}
        <FullReviewsSection />
        {/* Chats card removed */}
        {/* Top Users removed from dashboard */}


      </div>
    </>
  );
}
