'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import type { ProdutoVendas } from '@/types'

interface DataFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProdutoVendas[]) => void
  meses: string[]
}

export function DataFormModal({ isOpen, onClose, onSubmit, meses }: DataFormModalProps) {
  const [manualData, setManualData] = useState<ProdutoVendas>({
    produto: '',
    vendas: meses.map(mes => ({ mes, quantidade: 0 }))
  })

  const resetForm = () => {
    setManualData({
      produto: '',
      vendas: meses.map(mes => ({ mes, quantidade: 0 }))
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit([manualData])
    resetForm()
    onClose()
  }

  const handleProdutoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualData(prev => ({
      ...prev,
      produto: e.target.value
    }))
  }

  const handleVendaChange = (mes: string, value: number) => {
    setManualData(prev => ({
      ...prev,
      vendas: prev.vendas.map(v => 
        v.mes === mes ? { ...v, quantidade: value } : v
      )
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto sm:max-w-[95vw] sm:max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            Adicionar Dados Manualmente
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="produto">Produto</Label>
            <Input
              id="produto"
              value={manualData.produto}
              onChange={handleProdutoChange}
              placeholder="Nome do produto"
              required
            />
          </div>

          <div className="space-y-2 sm:space-y-4">
            <Label>Vendas por Mês</Label>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
              {manualData.vendas.map((venda) => (
                <div key={venda.mes} className="space-y-1 sm:space-y-2">
                  <Label htmlFor={`venda-${venda.mes}`}>{venda.mes}</Label>
                  <Input
                    id={`venda-${venda.mes}`}
                    type="number"
                    min="0"
                    value={venda.quantidade}
                    onChange={(e) => 
                      handleVendaChange(venda.mes, Number(e.target.value))
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              resetForm()
              onClose()
            }}>
              Cancelar
            </Button>
            <Button type="submit">
              Adicionar Dados
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}