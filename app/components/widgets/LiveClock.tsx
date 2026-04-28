'use client'

import { useState, useEffect } from 'react'

export function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow p-6 text-white">
      <h3 className="text-sm font-medium opacity-90 mb-2">Current Time</h3>
      <div className="text-4xl font-bold tabular-nums">
        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
      <div className="text-sm opacity-90 mt-2">
        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
    </div>
  )
}
