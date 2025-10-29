
import OverviewCardsClient from "./OverviewCardsClient";

// Server component wrapper that delegates rendering to the client component.
export function OverviewCardsGroup() {
  return <OverviewCardsClient />;
}
