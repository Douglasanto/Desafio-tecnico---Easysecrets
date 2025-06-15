import { useState, useEffect } from 'react';
import { ProdutoVendas, FilterOptions } from '../types';
import { useTheme } from 'next-themes';

interface FilterControlsProps {
  data: ProdutoVendas[];
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
}

export default function FilterControls({ data, filterOptions, setFilterOptions }: FilterControlsProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mesesDisponiveis, setMesesDisponiveis] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data.length > 0 && data[0].vendas.length > 0) {
      const meses = data[0].vendas.map(v => v.mes);
      setMesesDisponiveis(meses);

      if (!filterOptions.produtoSelecionado) {
        setFilterOptions({
          ...filterOptions,
          produtoSelecionado: data[0].produto,
          mesInicial: meses[0],
          mesFinal: meses[meses.length - 1]
        });
      }
    }
  }, [data]);

  if (!mounted) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filtros</h2>
      </div>
    );
  }

  const isDarkMode = resolvedTheme === 'dark';

  const containerBg = isDarkMode ? 'bg-white' : 'bg-gray-800';
  const textColor = isDarkMode ? 'text-gray-800' : 'text-gray-200';
  const labelColor = isDarkMode ? 'text-gray-700' : 'text-gray-300';
  const selectBg = isDarkMode ? 'bg-gray-100' : 'bg-gray-700';
  const selectText = isDarkMode ? 'text-gray-800' : 'text-gray-200';
  const selectBorder = isDarkMode ? 'border-gray-300' : 'border-gray-600';

  if (data.length === 0) {
    return (
      <div className={`p-6 ${containerBg} rounded-lg shadow`}>
        <h2 className={`text-xl font-semibold mb-4 ${textColor}`}>Filtros</h2>
        <p className={labelColor}>
          Carregue os dados para ver as opções de filtro
        </p>
      </div>
    );
  }

  return (
    <div className={`p-6 ${containerBg} rounded-lg shadow`}>
      <h2 className={`text-xl font-semibold mb-4 ${textColor}`}>Filtros</h2>

      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${labelColor}`}>Produto</label>
          <select
            value={filterOptions.produtoSelecionado || ''}
            onChange={(e) => setFilterOptions({
              ...filterOptions,
              produtoSelecionado: e.target.value
            })}
            className={`w-full p-2 border rounded-md ${selectBg} ${selectText} ${selectBorder}`}
          >
            {data.map((produto) => (
              <option key={produto.produto} value={produto.produto}>
                {produto.produto}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${labelColor}`}>Mês Inicial</label>
          <select
            value={filterOptions.mesInicial || ''}
            onChange={(e) => setFilterOptions({
              ...filterOptions,
              mesInicial: e.target.value
            })}
            className={`w-full p-2 border rounded-md ${selectBg} ${selectText} ${selectBorder}`}
          >
            {mesesDisponiveis.map((mes) => (
              <option key={`inicio-${mes}`} value={mes}>
                {mes}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${labelColor}`}>Mês Final</label>
          <select
            value={filterOptions.mesFinal || ''}
            onChange={(e) => setFilterOptions({
              ...filterOptions,
              mesFinal: e.target.value
            })}
            className={`w-full p-2 border rounded-md ${selectBg} ${selectText} ${selectBorder}`}
          >
            {mesesDisponiveis.map((mes) => (
              <option key={`fim-${mes}`} value={mes}>
                {mes}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
