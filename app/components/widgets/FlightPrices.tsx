'use client'

import { useState, useEffect } from 'react'

interface FlightRoute {
  from: string
  to: string
  price: number
  airline: string
  class: string
}

export function FlightPrices() {
  const [flights, setFlights] = useState<FlightRoute[]>([])

  useEffect(() => {
    // Demo flight data
    const routes: FlightRoute[] = [
      { from: 'ORD', to: 'BOM', price: 847, airline: 'Air India', class: 'Economy' },
      { from: 'DFW', to: 'LHR', price: 612, airline: 'British Airways', class: 'Economy' },
    ]

    // Add slight random variation
    const updatedRoutes = routes.map(flight => ({
      ...flight,
      price: Math.round(flight.price + (Math.random() - 0.5) * 50),
    }))

    setFlights(updatedRoutes)
  }, [])

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow p-3 text-white">
      <h3 className="text-sm font-medium opacity-90 mb-2">✈️ Flight Prices</h3>
      <div className="space-y-1.5">
        {flights.map((flight, index) => (
          <div key={index} className="bg-white/10 backdrop-blur rounded p-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm">{flight.from}</span>
                <span className="text-xs opacity-75">→</span>
                <span className="font-bold text-sm">{flight.to}</span>
              </div>
              <div className="text-lg font-bold">${flight.price}</div>
            </div>
            <div className="flex justify-between text-xs opacity-75 mt-0.5">
              <span>{flight.airline}</span>
              <span>{flight.class}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
