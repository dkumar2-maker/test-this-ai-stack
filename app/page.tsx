export const dynamic = 'force-dynamic'

import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

async function checkSupabase() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.getSession();
    return !error;
  } catch {
    return false;
  }
}

async function checkOpenAI() {
  if (!process.env.OPENAI_API_KEY) return false;

  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function checkStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return false;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    await stripe.balance.retrieve();
    return true;
  } catch {
    return false;
  }
}

function checkPostHog() {
  return !!(process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST);
}

export default async function Home() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  const [supabaseStatus, openaiStatus, stripeStatus, posthogStatus] = await Promise.all([
    checkSupabase(),
    checkOpenAI(),
    checkStripe(),
    Promise.resolve(checkPostHog()),
  ]);

  const services = [
    { name: 'Supabase', status: supabaseStatus, description: 'Database & Auth' },
    { name: 'OpenAI', status: openaiStatus, description: 'AI Chat API' },
    { name: 'Stripe', status: stripeStatus, description: 'Payments' },
    { name: 'PostHog', status: posthogStatus, description: 'Analytics' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">AI SaaS Stack Status</h1>
          <div className="flex items-center gap-3">
            {session && (
              <a
                href="/dashboard"
                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                Dashboard
              </a>
            )}
            {session ? (
              <form action="/auth/logout" method="post">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Sign Out ({session.user.email})
                </button>
              </form>
            ) : (
              <a
                href="/auth/login"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign In
              </a>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Service Status</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg"
              >
                <div>
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      service.status ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  <span className={service.status ? 'text-green-600' : 'text-red-600'}>
                    {service.status ? 'Connected' : 'Not Configured'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <a
                href="/auth/signup"
                className="p-3 border border-zinc-200 dark:border-zinc-800 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                📝 Sign Up
              </a>
              <a
                href="/auth/login"
                className="p-3 border border-zinc-200 dark:border-zinc-800 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                🔐 Login
              </a>
            </div>
          </div>

          {(!openaiStatus || !stripeStatus) && (
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> Some services are not configured. Add the missing API keys to .env.local to enable all features.
              </p>
            </div>
          )}
        </div>

        <footer className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>Built with Next.js, Supabase, OpenAI, Stripe, and PostHog</p>
          <p className="mt-2">
            <a
              href="https://github.com/dkumar2-maker/test-this-ai-stack"
              className="text-blue-600 hover:underline"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
