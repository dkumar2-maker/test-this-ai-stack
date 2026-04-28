'use client'

import { useState, useEffect } from 'react'

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "Build something people want.", author: "Paul Graham" },
  { text: "Make something people want includes making a company that people want to work for.", author: "Sahil Lavingia" },
  { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { text: "Move fast and break things.", author: "Mark Zuckerberg" },
]

export function QuoteOfTheDay() {
  const [quote, setQuote] = useState(quotes[0])

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    setQuote(quotes[dayOfYear % quotes.length])
  }, [])

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">💡 Quote of the Day</h3>
      <blockquote className="text-lg italic text-zinc-900 dark:text-white mb-3">
        "{quote.text}"
      </blockquote>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">— {quote.author}</p>
    </div>
  )
}
