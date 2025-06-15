'use client'

import { useMemo } from 'react'
import { useTheme } from 'next-themes'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Chart } from 'react-chartjs-2'
import type { ProdutoVendas, ChartType, FilterOptions } from '@/types'
import { getChartOptions, getChartData } from '@/lib/chart-utils'

ChartJS.register(...registerables)

interface ChartContainerProps {
  data: ProdutoVendas[]
  chartType: ChartType
  filterOptions: FilterOptions
}

export default function ChartContainer({
  data,
  chartType,
  filterOptions
}: ChartContainerProps) {
  const { resolvedTheme } = useTheme()

  const chartData = useMemo(() => 
    getChartData(data, filterOptions, resolvedTheme), 
    [data, filterOptions, resolvedTheme]
  )

  const options = useMemo(() => 
    getChartOptions(resolvedTheme), 
    [resolvedTheme]
  )

  return (
    <div className="p-4 sm:p-6 bg-card rounded-lg shadow h-[24rem] sm:h-[28rem] md:h-[32rem] text-foreground">
      <div className="h-full">
        <Chart 
          type={chartType} 
          data={chartData} 
          options={options} 
        />
      </div>
    </div>
  )
}