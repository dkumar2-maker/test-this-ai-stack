'use client'

import { useState, useEffect } from 'react'

interface IndexData {
  name: string
  symbol: string
  price: number
  change: number
  changePercent: number
}

export function MarketIndexes() {
  const [indexes, setIndexes] = useState<IndexData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Demo data - in production, replace with real API
    const demoData: IndexData[] = [
      { name: 'S&P 500', symbol: 'SPX', price: 5234.18, change: 23.45, changePercent: 0.45 },
      { name: 'Dow Jones', symbol: 'DJI', price: 38475.50, change: -45.23, changePercent: -0.12 },
      { name: 'NASDAQ', symbol: 'IXIC', price: 16315.70, change: 125.80, changePercent: 0.78 },
    ]

    // Simulate slight random changes
    const updatedData = demoData.map(index => ({
      ...index,
      price: index.price + (Math.random() - 0.5) * 10,
      change: index.change + (Math.random() - 0.5) * 5,
      changePercent: index.changePercent + (Math.random() - 0.5) * 0.2,
    }))

    setIndexes(updatedData)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">📈 US Market Indexes</h3>
        <div className="text-center py-4 text-zinc-600 dark:text-zinc-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">📈 US Market Indexes</h3>
      <div className="space-y-4">
        {indexes.map((index) => (
          <div key={index.symbol} className="border-b border-zinc-200 dark:border-zinc-800 pb-3 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="font-semibold text-zinc-900 dark:text-white">{index.name}</div>
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
      <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-4 text-center">Demo data • Updates on refresh</div>
    </div>
  )
}
