'use client'

import { useState, useEffect } from 'react'

interface WeatherData {
  location: string
  flag: string
  temp: number
  condition: string
  emoji: string
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(true)

  const locations = [
    { name: 'Chicago', flag: '🇺🇸', lat: 41.8781, lon: -87.6298 },
    { name: 'Dallas', flag: '🇺🇸', lat: 32.7767, lon: -96.7970 },
    { name: 'Mumbai', flag: '🇮🇳', lat: 19.0760, lon: 72.8777 },
    { name: 'London', flag: '🇬🇧', lat: 51.5074, lon: -0.1278 },
  ]

  const getWeatherEmoji = (code: number) => {
    if (code === 0) return '☀️'
    if (code <= 3) return '⛅'
    if (code <= 48) return '☁️'
    if (code <= 67) return '🌧️'
    if (code <= 77) return '❄️'
    if (code <= 82) return '🌧️'
    if (code <= 86) return '🌨️'
    return '⛈️'
  }

  const getConditionText = (code: number) => {
    if (code === 0) return 'Clear'
    if (code <= 3) return 'Partly Cloudy'
    if (code <= 48) return 'Cloudy'
    if (code <= 67) return 'Rainy'
    if (code <= 77) return 'Snowy'
    if (code <= 82) return 'Rain Showers'
    if (code <= 86) return 'Snow Showers'
    return 'Thunderstorm'
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherPromises = locations.map(async (loc) => {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true&temperature_unit=fahrenheit`
          )
          const data = await response.json()
          const temp = Math.round(data.current_weather.temperature)
          const weatherCode = data.current_weather.weathercode

          return {
            location: loc.name,
            flag: loc.flag,
            temp,
            condition: getConditionText(weatherCode),
            emoji: getWeatherEmoji(weatherCode),
          }
        })

        const results = await Promise.all(weatherPromises)
        setWeather(results)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching weather:', error)
        setLoading(false)
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 300000) // Update every 5 minutes
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg shadow p-6 text-white">
        <h3 className="text-sm font-medium opacity-90 mb-4">🌤️ Weather</h3>
        <div className="text-center py-4">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg shadow p-6 text-white">
      <h3 className="text-sm font-medium opacity-90 mb-4">🌤️ World Weather</h3>
      <div className="space-y-3">
        {weather.map((w) => (
          <div key={w.location} className="flex items-center justify-between border-t border-white/20 pt-3 first:border-0 first:pt-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl w-8 text-center">{w.emoji}</span>
              <div className="flex flex-col">
                <div className="text-sm font-medium leading-tight">{w.flag} {w.location}</div>
                <div className="text-xs opacity-80 leading-tight mt-0.5">{w.condition}</div>
              </div>
            </div>
            <div className="text-2xl font-bold tabular-nums">{w.temp}°F</div>
          </div>
        ))}
      </div>
      <div className="text-xs opacity-70 mt-4 text-center">Updates every 5 minutes</div>
    </div>
  )
}
