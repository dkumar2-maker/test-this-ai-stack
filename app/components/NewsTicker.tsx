'use client'

import { useEffect, useState } from 'react'

interface NewsItem {
  title: string
  source: string
}

export function NewsTicker() {
  const [news] = useState<NewsItem[]>([
    { title: 'Markets reach new highs as tech sector rallies', source: 'Bloomberg' },
    { title: 'Federal Reserve announces interest rate decision', source: 'CNBC' },
    { title: 'Major tech companies report quarterly earnings', source: 'Reuters' },
    { title: 'Global markets respond to economic data release', source: 'WSJ' },
    { title: 'Cryptocurrency prices fluctuate amid regulatory news', source: 'Financial Times' },
    { title: 'Oil prices steady as production forecasts adjust', source: 'Bloomberg' },
    { title: 'Housing market shows signs of stabilization', source: 'CNBC' },
    { title: 'Unemployment rates hit record lows in major economies', source: 'Reuters' },
    { title: 'Tech IPO season begins with strong investor interest', source: 'WSJ' },
    { title: 'Climate summit reaches landmark agreement', source: 'BBC News' },
  ])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white py-2 z-50 overflow-hidden border-t border-emerald-500/30">
      <div className="flex items-center">
        <div className="bg-emerald-600 text-white px-4 py-1 font-bold text-sm uppercase flex-shrink-0 mr-4">
          Live News
        </div>
        <div className="ticker-wrap flex-1 overflow-hidden">
          <div className="ticker-move flex gap-8 animate-scroll">
            {/* Duplicate the news items to create seamless loop */}
            {[...news, ...news, ...news].map((item, index) => (
              <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-emerald-400">●</span>
                <span className="font-medium">{item.title}</span>
                <span className="text-zinc-400 text-sm">({item.source})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
        }

        .ticker-wrap:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
