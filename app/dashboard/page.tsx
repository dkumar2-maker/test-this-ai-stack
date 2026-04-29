export const dynamic = 'force-dynamic'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LiveClock } from "@/app/components/widgets/LiveClock";
import { MarketIndexes } from "@/app/components/widgets/MarketIndexes";
import { ThisDayInHistory } from "@/app/components/widgets/ThisDayInHistory";
import { WeatherWidget } from "@/app/components/widgets/WeatherWidget";
import { GlobalIndexes } from "@/app/components/widgets/GlobalIndexes";
import { CountdownWidget } from "@/app/components/widgets/CountdownWidget";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Home
              </a>
              <form action="/auth/logout" method="post">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Welcome back!
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
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

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold mb-4">Profile</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Email
                  </label>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-white">
                    {user.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    User ID
                  </label>
                  <p className="mt-1 text-xs text-zinc-900 dark:text-white font-mono">
                    {user.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Account Created
                  </label>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-white">
                    {new Date(user.created_at!).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Last Sign In
                  </label>
                  <p className="mt-1 text-sm text-zinc-900 dark:text-white">
                    {new Date(user.last_sign_in_at!).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity & Features */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="text-center py-8 text-zinc-600 dark:text-zinc-400">
                <p>No recent activity yet.</p>
                <p className="text-sm mt-2">Start using the app to see your activity here!</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors text-left">
                  <div className="text-2xl mb-2">💬</div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white">AI Chat</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Start a conversation (requires OpenAI key)
                  </p>
                </button>

                <button className="p-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors text-left">
                  <div className="text-2xl mb-2">💳</div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white">Upgrade Plan</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Access premium features (requires Stripe)
                  </p>
                </button>

                <button className="p-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors text-left">
                  <div className="text-2xl mb-2">⚙️</div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white">Settings</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Configure your preferences
                  </p>
                </button>

                <a
                  href="/"
                  className="p-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors text-left"
                >
                  <div className="text-2xl mb-2">🏠</div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white">Status Page</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Check service connections
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
