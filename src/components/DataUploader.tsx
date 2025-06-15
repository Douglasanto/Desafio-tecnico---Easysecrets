import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ProdutoVendas } from '../types';

interface DataUploaderProps {
  onDataUpload: (data: ProdutoVendas[]) => void;
}

export default function DataUploader({ onDataUpload }: DataUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const result = JSON.parse(reader.result as string);
          onDataUpload(Array.isArray(result) ? result : [result]);
        } catch (error) {
          alert('Erro ao analisar o arquivo JSON');
        }
      };
      reader.readAsText(file);
    });
  }, [onDataUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    multiple: false
  });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Upload de Dados
      </h2>
      
      <div 
        {...getRootProps()} 
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          bg-white dark:bg-gray-800
          border-gray-300 dark:border-gray-600
          text-gray-600 dark:text-gray-300
          transition-colors duration-200
          ${isDragActive && `
            border-blue-500 bg-blue-50 dark:bg-blue-900/30
            text-blue-800 dark:text-blue-200
          `}
        `}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600 dark:text-gray-300">
          {isDragActive ? 
            'Solte o arquivo JSON aqui' : 
            'Arraste e solte um JSON aqui, ou clique para selecionar'}
        </p>
      </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 px-2">
        Apenas arquivos .json são aceitos. Tamanho máximo: 5MB.
      </p>
    </div>
  );
}
      