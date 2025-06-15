'use client'

import { useMemo, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';
import { ProdutoVendas, ChartType, FilterOptions } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface ChartContainerProps {
  data: ProdutoVendas[];
  chartType: ChartType;
  filterOptions: FilterOptions;
}

export default function ChartContainer({
  data,
  chartType,
  filterOptions,
}: ChartContainerProps) {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const themeColors = useMemo(() => ({
    text: isDarkMode ? 'hsl(222.2, 84%, 4.9%)' : 'hsl(210, 40%, 98%)',
    background: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(222.2, 84%, 10%)',
    primary: isDarkMode ? 'rgba(54, 162, 235, 0.5)' : 'rgba(99, 102, 241, 0.5)',
    primaryBorder: isDarkMode ? 'rgba(54, 162, 235, 1)' : 'rgba(99, 102, 241, 1)',
    grid: isDarkMode ? 'rgba(55, 65, 81, 0.1)' : 'rgba(229, 231, 235, 0.1)',
    tooltipBg: isDarkMode ? 'hsl(222.2, 84%, 4.9%)' : 'hsl(210, 40%, 98%)',
    tooltipText: isDarkMode ? 'hsl(210, 40%, 98%)' : 'hsl(222.2, 84%, 4.9%)',
  }), [isDarkMode]);

  const chartData = useMemo(() => {
    if (data.length === 0 || !filterOptions.produtoSelecionado) {
      return null;
    }

    const produto = data.find((p) => p.produto === filterOptions.produtoSelecionado);
    if (!produto) return null;

    const meses = produto.vendas.map((v) => v.mes);
    const inicioIdx = meses.indexOf(filterOptions.mesInicial || meses[0]);
    const fimIdx = meses.indexOf(filterOptions.mesFinal || meses[meses.length - 1]);

    const vendasFiltradas = produto.vendas.slice(
      Math.min(inicioIdx, fimIdx),
      Math.max(inicioIdx, fimIdx) + 1
    );

    return {
      labels: vendasFiltradas.map((v) => v.mes),
      datasets: [
        {
          label: `Vendas de ${produto.produto}`,
          data: vendasFiltradas.map((v) => v.quantidade),
          backgroundColor: themeColors.primary,
          borderColor: themeColors.primaryBorder,
          borderWidth: 1,
        },
      ],
    };
  }, [data, filterOptions, themeColors]);

  useEffect(() => {
    ChartJS.defaults.color = themeColors.text;
    ChartJS.defaults.borderColor = themeColors.grid;
  }, [themeColors]);

  if (!chartData) {
    return (
      <div
        className={`p-8 ${isDarkMode ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow flex items-center justify-center h-96`}
      >
        <p className={isDarkMode ? 'text-gray-800' : 'text-gray-200'}>
          {data.length === 0
            ? 'Carregue os dados para visualizar o gráfico'
            : 'Selecione um produto para renderizar o gráfico'}
        </p>
      </div>
    );
  }

  const chartProps = {
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            color: themeColors.text,
          },
        },
        title: {
          display: true,
          text: `Vendas de ${filterOptions.produtoSelecionado}`,
          color: themeColors.text,
          font: {
            size: 16,
          },
        },
        tooltip: {
          titleColor: themeColors.tooltipText,
          bodyColor: themeColors.tooltipText,
          backgroundColor: themeColors.tooltipBg,
          borderColor: themeColors.grid,
          borderWidth: 1,
          padding: 12,
          usePointStyle: true,
        },
      },
      scales:
        chartType === 'bar' || chartType === 'line'
          ? {
              x: {
                ticks: {
                  color: themeColors.text,
                },
                grid: {
                  color: themeColors.grid,
                },
              },
              y: {
                ticks: {
                  color: themeColors.text,
                },
                grid: {
                  color: themeColors.grid,
                },
              },
            }
          : undefined,
      maintainAspectRatio: false,
    },
  };

  return (
    <div
      className={`p-6 ${isDarkMode ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow h-96 transition-colors duration-300`}
    >
      <div className="h-full">
        {chartType === 'bar' && <Bar {...chartProps} />}
        {chartType === 'line' && <Line {...chartProps} />}
        {chartType === 'pie' && <Pie {...chartProps} />}
        {chartType === 'doughnut' && <Doughnut {...chartProps} />}
        {chartType === 'radar' && <Radar {...chartProps} />}
      </div>
    </div>
  );
}
