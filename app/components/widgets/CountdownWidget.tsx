'use client'

import { useState, useEffect } from 'react'

export function CountdownWidget() {
  const [targetDate] = useState(new Date('2026-05-18T00:00:00'))
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow p-6 text-white">
      <h3 className="text-sm font-medium opacity-90 mb-2">🎯 Days Until Hackathon</h3>
      <div className="text-xs opacity-80 mb-4">May 18, 2026</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-5xl font-bold tabular-nums">{timeLeft.days}</div>
          <div className="text-sm opacity-90 mt-1">DAYS</div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold tabular-nums">{timeLeft.hours}</div>
          <div className="text-sm opacity-90 mt-1">HOURS</div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold tabular-nums">{timeLeft.minutes}</div>
          <div className="text-sm opacity-90 mt-1">MINUTES</div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold tabular-nums">{timeLeft.seconds}</div>
          <div className="text-sm opacity-90 mt-1">SECONDS</div>
        </div>
      </div>
    </div>
  )
}
