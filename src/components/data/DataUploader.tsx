'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import type { ProdutoVendas } from '@/types'

interface DataUploaderProps {
  onDataUpload: (data: ProdutoVendas[]) => void
}

export function DataUploader({ onDataUpload }: DataUploaderProps) {
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      
      reader.onabort = () => {
        toast({
          title: 'Upload cancelado',
          description: 'A leitura do arquivo foi interrompida',
          variant: 'destructive'
        })
      }

      reader.onerror = () => {
        toast({
          title: 'Erro na leitura',
          description: 'Ocorreu um erro ao ler o arquivo',
          variant: 'destructive'
        })
      }

      reader.onload = () => {
        try {
          const result = JSON.parse(reader.result as string)
          const data = Array.isArray(result) ? result : [result]
          
          // Basic validation
          if (!data.every(item => item.produto && item.vendas)) {
            throw new Error('Formato de dados inválido')
          }

          onDataUpload(data)
          toast({
            title: 'Upload realizado',
            description: `Dados de ${data.length} produto(s) carregados`,
          })
        } catch (error) {
          toast({
            title: 'Erro no arquivo',
            description: error instanceof Error 
              ? error.message 
              : 'O arquivo JSON está mal formatado',
            variant: 'destructive'
          })
        }
      }

      reader.readAsText(file)
    })
  }, [onDataUpload, toast])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    multiple: false,
    maxSize: 1024 * 1024 // 1MB
  })

  return (
    <div 
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-primary"
    >
      <input {...getInputProps()} />
      <div className="space-y-2">
        <p className="text-sm font-medium">
          {isDragActive 
            ? 'Solte o arquivo JSON aqui' 
            : 'Arraste e solte um JSON aqui'}
        </p>
        <p className="text-xs text-muted-foreground">
          Apenas arquivos .json são aceitos (até 1MB)
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-2"
          onClick={(e) => e.stopPropagation()}
        >
          Selecione um arquivo
        </Button>
      </div>
    </div>
  )
}