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

  // Sports historical events database (organized by month-day)
  const historicalEvents: { [key: string]: HistoricalEvent[] } = {
    '04-29': [
      { year: 1986, event: 'Michael Jordan scores 63 points in a playoff game against the Celtics, an NBA playoff record', category: 'Basketball' },
      { year: 2017, event: 'Anthony Joshua defeats Wladimir Klitschko in an epic heavyweight championship bout', category: 'Boxing' },
      { year: 1961, event: 'The Boston Celtics win their third consecutive NBA championship', category: 'Basketball' },
      { year: 2007, event: 'Tom Brady signs record-breaking contract extension with the Patriots', category: 'NFL' },
    ],
    '05-18': [
      { year: 1980, event: 'Magic Johnson scores 42 points as a rookie to lead Lakers to NBA Finals victory', category: 'Basketball' },
      { year: 1946, event: 'Jackie Robinson makes his minor league debut, breaking baseball\'s color barrier', category: 'Baseball' },
      { year: 1997, event: 'Michael Jordan\'s "Flu Game" - scores 38 points despite being ill in NBA Finals', category: 'Basketball' },
      { year: 2013, event: 'Sergio Garcia wins his first major championship at The Masters', category: 'Golf' },
    ],
    '01-01': [
      { year: 2018, event: 'Alabama defeats Georgia in overtime to win the College Football National Championship', category: 'Football' },
      { year: 2006, event: 'Texas defeats USC in the Rose Bowl, one of the greatest college football games ever', category: 'Football' },
      { year: 1974, event: 'Miami Dolphins complete the only perfect season in NFL history', category: 'NFL' },
    ],
    '07-04': [
      { year: 1939, event: 'Lou Gehrig delivers his famous "Luckiest Man" speech at Yankee Stadium', category: 'Baseball' },
      { year: 2012, event: 'Roger Federer wins his record 7th Wimbledon title', category: 'Tennis' },
      { year: 1976, event: 'Reggie Jackson hits 3 consecutive home runs in the All-Star Game', category: 'Baseball' },
    ],
    '12-25': [
      { year: 2008, event: 'Kobe Bryant scores 42 points on Christmas Day against the Celtics', category: 'Basketball' },
      { year: 2004, event: 'Shaquille O\'Neal returns to LA and faces his former Lakers team', category: 'Basketball' },
      { year: 2016, event: 'LeBron James leads Cavaliers to Christmas Day victory in NBA showcase', category: 'Basketball' },
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
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">🏆 This Day in Sports History</h3>
        <div className="text-center py-4 text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">🏆 This Day in Sports History</h3>
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
