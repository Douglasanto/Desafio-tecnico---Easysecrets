'use client'

import { useState } from 'react'
import { ChartType, FilterOptions, ProdutoVendas } from '@/types'
import { mergeProductSalesData } from '@/lib/data-utils'
import HeroSection from '@/components/layout/HeroSection'
import ChartSelector from '@/components/charts/ChartSelector'
import FilterControls from '@/components/controls/FilterControls'
import ChartContainer from '@/components/charts/ChartContainer'
import { sampleData } from '@/constants/sample-data'

export default function Home() {
  const [produtosData, setProdutosData] = useState<ProdutoVendas[]>(sampleData)
  const [chartType, setChartType] = useState<ChartType>('bar')
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    produtoSelecionado: sampleData[0]?.produto || ''
  })

  const handleDataUpload = (newData: ProdutoVendas[]) => {
    setProdutosData(prev => mergeProductSalesData(prev, newData))
    
    if (newData.length > 0) {
      setFilterOptions(prev => ({
        ...prev,
        produtoSelecionado: newData[0].produto
      }))
    }
  }

  return (
    <main className="min-h-screen p-2 sm:p-4 md:p-8">
      <HeroSection onDataUpload={handleDataUpload} />
      <div className="mt-4 sm:mt-6 md:mt-8 grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 md:grid-cols-4">
        <div className="space-y-2 sm:space-y-4 md:col-span-1">
          <ChartSelector 
            chartType={chartType}
            setChartType={setChartType}
          />
          <FilterControls 
            data={produtosData}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          />
        </div>
        <div className="md:col-span-3">
          <ChartContainer 
            data={produtosData}
            chartType={chartType}
            filterOptions={filterOptions}
          />
        </div>
      </div>
    </main>
  )
}