'use client'

import { useState, useEffect } from 'react'

interface HistoricalEvent {
  year: number
  event: string
  category: string
}

export function ThisDayInHistory() {
  const [event, setEvent] = useState<HistoricalEvent | null>(null)
  const [todayDate, setTodayDate] = useState('')

  // Historical events database (organized by month-day)
  const historicalEvents: { [key: string]: HistoricalEvent[] } = {
    '04-29': [
      { year: 1945, event: 'Adolf Hitler marries Eva Braun in his Berlin bunker, one day before their suicide', category: 'War' },
      { year: 1992, event: 'Los Angeles riots begin following the Rodney King verdict', category: 'Social' },
      { year: 2011, event: 'Prince William marries Catherine Middleton at Westminster Abbey', category: 'Royal' },
      { year: 1997, event: 'The Chemical Weapons Convention enters into force', category: 'Peace' },
    ],
    '05-18': [
      { year: 1980, event: 'Mount St. Helens erupts in Washington state, killing 57 people', category: 'Natural' },
      { year: 1896, event: 'The U.S. Supreme Court rules in Plessy v. Ferguson, establishing "separate but equal"', category: 'Legal' },
      { year: 1969, event: 'Apollo 10 launches, the dress rehearsal for the first Moon landing', category: 'Space' },
      { year: 1953, event: 'The first woman to fly faster than sound, Jacqueline Cochran, breaks the sound barrier', category: 'Aviation' },
    ],
    '01-01': [
      { year: 1863, event: 'Abraham Lincoln issues the Emancipation Proclamation', category: 'Freedom' },
      { year: 1994, event: 'NAFTA (North American Free Trade Agreement) goes into effect', category: 'Economics' },
      { year: 2002, event: 'Euro notes and coins enter circulation in 12 European countries', category: 'Currency' },
    ],
    '07-04': [
      { year: 1776, event: 'The United States Declaration of Independence is adopted', category: 'Independence' },
      { year: 2012, event: 'CERN announces discovery of the Higgs boson particle', category: 'Science' },
      { year: 1997, event: "NASA's Pathfinder space probe lands on Mars", category: 'Space' },
    ],
    '12-25': [
      { year: 1991, event: 'Mikhail Gorbachev resigns as president of the Soviet Union', category: 'Politics' },
      { year: 1968, event: 'Apollo 8 astronauts become the first humans to orbit the Moon', category: 'Space' },
      { year: 800, event: 'Charlemagne is crowned Holy Roman Emperor', category: 'History' },
    ],
  }

  useEffect(() => {
    const today = new Date()
    const monthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })

    setTodayDate(dateStr)

    // Get events for today, or use a default set if not found
    const todayEvents = historicalEvents[monthDay] || historicalEvents['04-29']

    // Pick a random event from today's events
    const randomEvent = todayEvents[Math.floor(Math.random() * todayEvents.length)]
    setEvent(randomEvent)
  }, [])

  if (!event) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">📅 This Day in History</h3>
        <div className="text-center py-4 text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">📅 This Day in History</h3>
      <div className="mb-3">
        <div className="text-xs text-zinc-500 dark:text-zinc-500 mb-2">{todayDate}</div>
        <div className="inline-block px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium rounded mb-3">
          {event.category}
        </div>
      </div>
      <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-3">
        {event.year}
      </div>
      <p className="text-base text-zinc-900 dark:text-white leading-relaxed">
        {event.event}
      </p>
    </div>
  )
}
