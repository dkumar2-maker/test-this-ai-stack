'use client'

import { useState, useEffect } from 'react'

const quotes = [
  { text: "I'm not lazy, I'm just on energy-saving mode.", author: "Anonymous Developer" },
  { text: "There are only two hard things in Computer Science: cache invalidation and naming things.", author: "Phil Karlton" },
  { text: "It works on my machine.", author: "Every Developer Ever" },
  { text: "I don't always test my code, but when I do, I do it in production.", author: "Anonymous" },
  { text: "Programming is 10% writing code and 90% understanding why it's not working.", author: "Anonymous" },
  { text: "I would tell you a UDP joke, but you might not get it.", author: "Network Humor" },
  { text: "Why do programmers prefer dark mode? Because light attracts bugs.", author: "Dev Wisdom" },
  { text: "In theory, there's no difference between theory and practice. In practice, there is.", author: "Yogi Berra" },
  { text: "I'm not procrastinating, I'm doing side quests.", author: "Gamer Logic" },
  { text: "Coffee: because debugging before caffeine is like trying to read binary without a computer.", author: "Caffeine Enthusiast" },
  { text: "I speak fluent sarcasm and broken code.", author: "Modern Developer" },
  { text: "My code doesn't have bugs, it just develops random features.", author: "Optimistic Programmer" },
]

export function QuoteOfTheDay() {
  const [quote, setQuote] = useState(quotes[0])

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    setQuote(quotes[dayOfYear % quotes.length])
  }, [])

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow p-6 border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4">Quote of the Day</h3>
      <blockquote className="text-lg italic text-zinc-900 dark:text-white mb-3">
        "{quote.text}"
      </blockquote>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">— {quote.author}</p>
    </div>
  )
}
