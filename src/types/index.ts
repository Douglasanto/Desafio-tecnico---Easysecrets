export type Venda = {
    mes: string;
    quantidade: number;
}

export type ProdutoVendas = {
    produto: string;
    vendas: Venda[];
}

export type Dataset = {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
};

export type ChartData = {
    labels: string[];
    datasets: Dataset[];
}

export type ChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

export type FilterOptions = {
    produtoSelecionado?: string;
    mesInicial?: string;
    mesFinal?: string;
}

