'use client'

import { useState, useEffect } from 'react'

export function StreakCounter() {
  const [streak, setStreak] = useState(0)
  const [lastVisit, setLastVisit] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('dailyStreak')
    const lastVisitStored = localStorage.getItem('lastVisit')
    const today = new Date().toDateString()

    if (lastVisitStored === today) {
      setStreak(stored ? parseInt(stored) : 1)
      setLastVisit(lastVisitStored)
    } else {
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      if (lastVisitStored === yesterday) {
        const newStreak = (stored ? parseInt(stored) : 0) + 1
        setStreak(newStreak)
        localStorage.setItem('dailyStreak', newStreak.toString())
      } else {
        setStreak(1)
        localStorage.setItem('dailyStreak', '1')
      }
      localStorage.setItem('lastVisit', today)
      setLastVisit(today)
    }
  }, [])

  return (
    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow p-6 text-white">
      <h3 className="text-sm font-medium opacity-90 mb-2">🔥 Daily Streak</h3>
      <div className="text-5xl font-bold mb-1">{streak}</div>
      <div className="text-sm opacity-90">
        {streak === 1 ? 'day' : 'days'} in a row
      </div>
    </div>
  )
}
