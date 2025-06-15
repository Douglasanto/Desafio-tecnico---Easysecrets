'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import type { ProdutoVendas, FilterOptions } from '@/types'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FilterControlsProps {
  data: ProdutoVendas[]
  filterOptions: FilterOptions
  setFilterOptions: (options: FilterOptions) => void
}

export default function FilterControls({
  data,
  filterOptions,
  setFilterOptions
}: FilterControlsProps) {
  const [mounted, setMounted] = useState(false)
  const [mesesDisponiveis, setMesesDisponiveis] = useState<string[]>([])
  const { theme } = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (data.length > 0 && data[0].vendas.length > 0) {
      const meses = data[0].vendas.map(v => v.mes)
      setMesesDisponiveis(meses)

      if (!filterOptions.produtoSelecionado) {
        setFilterOptions({
          ...filterOptions,
          produtoSelecionado: data[0].produto,
          mesInicial: meses[0],
          mesFinal: meses[meses.length - 1]
        })
      }
    }
  }, [data, filterOptions, setFilterOptions])

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Produto</Label>
          <div className="h-10 rounded-md bg-muted" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Mês Inicial</Label>
            <div className="h-10 rounded-md bg-muted" />
          </div>
          <div className="space-y-2">
            <Label>Mês Final</Label>
            <div className="h-10 rounded-md bg-muted" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Produto</Label>
        <Select
          value={filterOptions.produtoSelecionado}
          onValueChange={(value) => 
            setFilterOptions({ ...filterOptions, produtoSelecionado: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um produto" />
          </SelectTrigger>
          <SelectContent>
            {data.map((produto) => (
              <SelectItem key={produto.produto} value={produto.produto}>
                {produto.produto}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Mês Inicial</Label>
          <Select
            value={filterOptions.mesInicial}
            onValueChange={(value) => 
              setFilterOptions({ ...filterOptions, mesInicial: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {mesesDisponiveis.map((mes) => (
                <SelectItem key={`inicio-${mes}`} value={mes}>
                  {mes}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Mês Final</Label>
          <Select
            value={filterOptions.mesFinal}
            onValueChange={(value) => 
              setFilterOptions({ ...filterOptions, mesFinal: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {mesesDisponiveis.map((mes) => (
                <SelectItem key={`fim-${mes}`} value={mes}>
                  {mes}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}