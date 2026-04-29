'use client'

import { useState, useEffect } from 'react'

interface IndexData {
  name: string
  symbol: string
  flag: string
  price: number
  change: number
  changePercent: number
}

export function GlobalIndexes() {
  const [indexes, setIndexes] = useState<IndexData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Demo data - in production, replace with real API
    const demoData: IndexData[] = [
      { name: 'FTSE 100', symbol: 'FTSE', flag: '🇬🇧', price: 8234.50, change: 15.30, changePercent: 0.19 },
      { name: 'Nifty 50', symbol: 'NIFTY', flag: '🇮🇳', price: 22475.35, change: -34.20, changePercent: -0.15 },
      { name: 'DAX', symbol: 'DAX', flag: '🇩🇪', price: 18125.80, change: 42.10, changePercent: 0.23 },
    ]

    // Simulate slight random changes
    const updatedData = demoData.map(index => ({
      ...index,
      price: index.price + (Math.random() - 0.5) * 20,
      change: index.change + (Math.random() - 0.5) * 10,
      changePercent: index.changePercent + (Math.random() - 0.5) * 0.3,
    }))

    setIndexes(updatedData)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">🌍 Global Indexes</h3>
        <div className="text-center py-4 text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">🌍 Global Indexes</h3>
      <div className="space-y-4">
        {indexes.map((index) => (
          <div key={index.symbol} className="border-b border-zinc-200 dark:border-zinc-800 pb-3 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="font-semibold text-zinc-900 dark:text-white">
                  {index.flag} {index.name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-500">{index.symbol}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-zinc-900 dark:text-white">
                  {index.price.toFixed(2)}
                </div>
                <div className={`text-sm font-medium ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {index.change >= 0 ? '▲' : '▼'} {Math.abs(index.change).toFixed(2)} ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
