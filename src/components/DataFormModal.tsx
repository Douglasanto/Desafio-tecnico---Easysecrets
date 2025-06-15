'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ProdutoVendas, Venda } from '@/types'

interface DataFormModalProps {
  isOpen: boolean
  onClose: () => void
  onDataSubmit?: (data: ProdutoVendas[]) => void
}

const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho']

export default function DataFormModal({ isOpen, onClose, onDataSubmit }: DataFormModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload')
  const [manualData, setManualData] = useState<ProdutoVendas>({
    produto: '',
    vendas: meses.map(mes => ({ mes, quantidade: 0 }))
  })

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const result = JSON.parse(reader.result as string)
          if (onDataSubmit) {
            onDataSubmit(Array.isArray(result) ? result : [result])
            onClose()
          }
        } catch (error) {
          alert('Erro ao analisar o arquivo JSON')
        }
      }
      reader.readAsText(file)
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    multiple: false
  })

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const hasValidSales = manualData.vendas.some(v => v.quantidade > 0)
    
    if (manualData.produto.trim() === '') {
      alert('Por favor, preencha o nome do produto')
      return
    }
    
    if (!hasValidSales) {
      alert('Por favor, adicione pelo menos uma venda com quantidade maior que zero')
      return
    }

    if (onDataSubmit) {
      onDataSubmit([manualData])
      setManualData({
        produto: '',
        vendas: meses.map(mes => ({ mes, quantidade: 0 }))
      })
      onClose()
    }
  }

  const handleProdutoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualData({
      ...manualData,
      produto: e.target.value
    })
  }

  const handleVendaChange = (mes: string, value: number) => {
    setManualData({
      ...manualData,
      vendas: manualData.vendas.map(v => 
        v.mes === mes ? { ...v, quantidade: value } : v
      )
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              Adicionar Dados de Vendas
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="flex border-b border-gray-700 mb-6">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'upload' ? 
                'text-blue-400 border-b-2 border-blue-400' : 
                'text-gray-400'}`}
              onClick={() => setActiveTab('upload')}
            >
              Upload JSON
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'manual' ? 
                'text-blue-400 border-b-2 border-blue-400' : 
                'text-gray-400'}`}
              onClick={() => setActiveTab('manual')}
            >
              Criar Manualmente
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer mb-4
                ${isDragActive ? 
                  'border-blue-400 bg-blue-900/30' : 
                  'border-gray-600'}`}
            >
              <input {...getInputProps()} />
              <p className="text-gray-300">
                {isDragActive ? 
                  'Solte o arquivo JSON aqui' : 
                  'Arraste e solte um JSON aqui, ou clique para selecionar'}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Apenas arquivos .json são aceitos
              </p>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Nome do Produto
                  </label>
                  <input
                    type="text"
                    value={manualData.produto}
                    onChange={handleProdutoChange}
                    className="w-full px-3 py-2 border rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {manualData.vendas.map((venda) => (
                    <div key={venda.mes} className="bg-gray-700 p-4 rounded-lg">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        {venda.mes}
                      </label>
                      <input
                        type="number"
                        value={venda.quantidade}
                        onChange={(e) => handleVendaChange(venda.mes, parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-600 text-white"
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Enviar Dados
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}