'use client'

import { useState, useEffect } from 'react'

export function ProgressTracker() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('dailyProgress')
    if (stored) {
      const data = JSON.parse(stored)
      const today = new Date().toDateString()
      if (data.date === today) {
        setProgress(data.value)
      } else {
        setProgress(0)
        localStorage.setItem('dailyProgress', JSON.stringify({ date: today, value: 0 }))
      }
    }
  }, [])

  const updateProgress = (value: number) => {
    const today = new Date().toDateString()
    const newProgress = Math.max(0, Math.min(100, value))
    setProgress(newProgress)
    localStorage.setItem('dailyProgress', JSON.stringify({ date: today, value: newProgress }))
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">📊 Today's Progress</h3>
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-600 dark:text-zinc-400">Daily Goal</span>
          <span className="font-semibold">{progress}%</span>
        </div>
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => updateProgress(progress + 10)}
          className="flex-1 px-3 py-2 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700"
        >
          +10%
        </button>
        <button
          onClick={() => updateProgress(progress - 10)}
          className="flex-1 px-3 py-2 bg-zinc-200 dark:bg-zinc-800 text-sm rounded hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          -10%
        </button>
        <button
          onClick={() => updateProgress(0)}
          className="px-3 py-2 bg-zinc-200 dark:bg-zinc-800 text-sm rounded hover:bg-zinc-300 dark:hover:bg-zinc-700"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
