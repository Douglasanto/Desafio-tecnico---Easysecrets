// src/lib/chart-utils.ts
import type { ProdutoVendas, FilterOptions } from '@/types'

export const getChartData = (
  produtosData: ProdutoVendas[],
  filterOptions: FilterOptions,
  theme?: string
) => {
  const produtoSelecionado = produtosData.find(
    p => p.produto === filterOptions.produtoSelecionado
  ) || produtosData[0]

  const labels = produtoSelecionado.vendas.map(v => v.mes)
  const data = produtoSelecionado.vendas.map(v => v.quantidade)

  return {
    labels,
    datasets: [{
      label: produtoSelecionado.produto,
      data,
      backgroundColor: theme === 'dark' ? '#3b82f6' : '#1d4ed8',
      borderColor: theme === 'dark' ? '#93c5fd' : '#1e40af',
      borderWidth: 1
    }]
  }
}

export const getChartOptions = (theme?: string) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: theme === 'dark' ? '#e5e7eb' : '#111827'
      }
    },
    tooltip: {
      backgroundColor: theme === 'dark' ? '#1f2937' : '#f9fafb',
      titleColor: theme === 'dark' ? '#f9fafb' : '#111827',
      bodyColor: theme === 'dark' ? '#e5e7eb' : '#374151'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: theme === 'dark' ? '#374151' : '#e5e7eb'
      },
      ticks: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280'
      }
    },
    x: {
      grid: {
        color: theme === 'dark' ? '#374151' : '#e5e7eb'
      },
      ticks: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280'
      }
    }
  }
})