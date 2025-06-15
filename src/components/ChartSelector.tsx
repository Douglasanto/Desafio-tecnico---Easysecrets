import { useEffect, useState } from 'react';
import { ChartType } from '../types';
import { useTheme } from 'next-themes';

interface ChartSelectorProps {
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
}

const chartTypes: { id: ChartType; label: string }[] = [
  { id: 'bar', label: 'Barras' },
  { id: 'line', label: 'Linhas' },
  { id: 'pie', label: 'Pizza' },
  { id: 'doughnut', label: 'Rosca' },
  { id: 'radar', label: 'Radar' },
];

export default function ChartSelector({ chartType, setChartType }: ChartSelectorProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Tipo de Gráfico</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {chartTypes.map((type) => (
            <button
              key={type.id}
              className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 cursor-not-allowed"
              disabled
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const isDarkMode = resolvedTheme === 'dark';

  const containerBg = isDarkMode ? 'bg-white' : 'bg-gray-800';
  const textColor = isDarkMode ? 'text-gray-800' : 'text-gray-200';
  const unselectedButtonBg = isDarkMode ? 'bg-gray-100' : 'bg-gray-700';
  const unselectedButtonHover = isDarkMode ? 'hover:bg-gray-200' : 'hover:bg-gray-600';
  const unselectedButtonText = isDarkMode ? 'text-gray-800' : 'text-gray-200';

  return (
    <div className={`p-6 ${containerBg} rounded-lg shadow`}>
      <h2 className={`text-xl font-semibold mb-4 ${textColor}`}>Tipo de Gráfico</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {chartTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setChartType(type.id)}
            className={`px-4 py-2 rounded-md transition-colors ${
              chartType === type.id
                ? 'bg-blue-600 text-white'
                : `${unselectedButtonBg} ${unselectedButtonHover} ${unselectedButtonText}`
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
