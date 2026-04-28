'use client'

import { useState, useEffect } from 'react'

export function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false)
            if (!isBreak) {
              setMinutes(5)
              setIsBreak(true)
            } else {
              setMinutes(25)
              setIsBreak(false)
            }
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, minutes, seconds, isBreak])

  const toggle = () => setIsActive(!isActive)
  const reset = () => {
    setIsActive(false)
    setMinutes(25)
    setSeconds(0)
    setIsBreak(false)
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">
        {isBreak ? '☕ Break Time' : '🍅 Pomodoro Timer'}
      </h3>
      <div className="text-5xl font-bold text-center mb-4 tabular-nums">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex gap-2">
        <button
          onClick={toggle}
          className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
