'use client'

import { useState, useEffect } from 'react'

export function CountdownWidget() {
  const [targetDate] = useState(new Date('2026-12-31T23:59:59'))
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
      <h3 className="text-sm font-medium opacity-90 mb-4">🎯 Days Until 2027</h3>
      <div className="grid grid-cols-4 gap-2">
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.days}</div>
          <div className="text-xs opacity-90">days</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.hours}</div>
          <div className="text-xs opacity-90">hrs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.minutes}</div>
          <div className="text-xs opacity-90">min</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{timeLeft.seconds}</div>
          <div className="text-xs opacity-90">sec</div>
        </div>
      </div>
    </div>
  )
}
