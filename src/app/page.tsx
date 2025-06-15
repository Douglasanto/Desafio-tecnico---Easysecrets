'use client'

import { useState } from 'react'
import { ChartType, FilterOptions, ProdutoVendas, sampleData } from '@/types'
import ChartSelector from '@/components/ChartSelector'
import FilterControls from '@/components/FilterControls'
import ChartContainer from '@/components/ChartContainer'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  const [produtosData, setProdutosData] = useState<ProdutoVendas[]>(sampleData)
  const [chartType, setChartType] = useState<ChartType>('bar')
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    produtoSelecionado: sampleData[0]?.produto || ''
  })

  const handleDataUpload = (newData: ProdutoVendas[]) => {
    const mergedData = [...produtosData]
    
    newData.forEach(newItem => {
      const existingIndex = mergedData.findIndex(item => item.produto === newItem.produto)
      if (existingIndex >= 0) {
        mergedData[existingIndex] = newItem
      } else {
        mergedData.push(newItem)
      }
    })

    setProdutosData(mergedData)
    
    if (newData.length > 0) {
      setFilterOptions(prev => ({
        ...prev,
        produtoSelecionado: newData[newData.length - 1].produto
      }))
    }
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <HeroSection onDataUpload={handleDataUpload} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div>
              <ChartSelector chartType={chartType} setChartType={setChartType} />
            </div>
            
            <div>
              <FilterControls 
                data={produtosData} 
                filterOptions={filterOptions} 
                setFilterOptions={setFilterOptions} 
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div>
              <ChartContainer 
                data={produtosData} 
                chartType={chartType} 
                filterOptions={filterOptions} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}