export const dynamic = 'force-dynamic'

import { NewsTicker } from "@/app/components/NewsTicker";
import { LiveClock } from "@/app/components/widgets/LiveClock";
import { MarketIndexes } from "@/app/components/widgets/MarketIndexes";
import { ThisDayInHistory } from "@/app/components/widgets/ThisDayInHistory";
import { WeatherWidget } from "@/app/components/widgets/WeatherWidget";
import { GlobalIndexes } from "@/app/components/widgets/GlobalIndexes";
import { CountdownWidget } from "@/app/components/widgets/CountdownWidget";

export default async function DashboardPage() {

  return (
    <div className="min-h-screen bg-zinc-800 dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <a
              href="/"
              className="text-sm text-zinc-300 hover:text-white"
            >
              Home
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back!
          </h2>
          <p className="text-zinc-300">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Widgets Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">👀 At a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LiveClock />
            <WeatherWidget />
            <CountdownWidget />
            <MarketIndexes />
            <GlobalIndexes />
            <ThisDayInHistory />
          </div>
        </div>

      </main>

      {/* News Ticker */}
      <NewsTicker />
    </div>
  );
}
