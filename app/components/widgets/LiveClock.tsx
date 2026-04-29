'use client'

import { useState, useEffect } from 'react'

export function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timezones = [
    { name: '🇺🇸 New York', zone: 'America/New_York' },
    { name: '🇮🇳 India', zone: 'Asia/Kolkata' },
    { name: '🇬🇧 London', zone: 'Europe/London' },
  ]

  return (
    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow p-6 text-white">
      <h3 className="text-sm font-medium opacity-90 mb-4">🌍 World Clock</h3>
      <div className="space-y-3">
        {timezones.map((tz) => (
          <div key={tz.zone} className="border-t border-white/20 pt-3 first:border-0 first:pt-0">
            <div className="text-xs opacity-80 mb-1">{tz.name}</div>
            <div className="text-2xl font-bold tabular-nums">
              {time.toLocaleTimeString('en-US', {
                timeZone: tz.zone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
