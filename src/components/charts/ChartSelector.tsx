// src/components/charts/ChartSelector.tsx
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import type { ChartType } from '@/types'
import { cn } from '@/lib/utils'

interface ChartSelectorProps {
  chartType: ChartType
  setChartType: (type: ChartType) => void
}

const CHART_TYPES = [
  { id: 'bar', label: 'Barras' },
  { id: 'line', label: 'Linhas' },
  { id: 'pie', label: 'Pizza' },
  { id: 'doughnut', label: 'Rosca' },
  { id: 'radar', label: 'Radar' }
] as const

export default function ChartSelector({
  chartType,
  setChartType
}: ChartSelectorProps) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="p-4 bg-card rounded-lg shadow space-y-4">
        <h2 className="text-lg font-medium">Tipo de Gráfico</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {CHART_TYPES.map((type) => (
            <button
              key={type.id}
              className="h-10 rounded-md bg-muted text-muted-foreground cursor-not-allowed"
              disabled
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-card rounded-lg shadow space-y-4">
      <h2 className="text-lg font-medium">Tipo de Gráfico</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {CHART_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setChartType(type.id)}
            className={cn(
              'h-10 rounded-md transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              chartType === type.id
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  )
}