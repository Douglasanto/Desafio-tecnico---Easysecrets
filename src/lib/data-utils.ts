import { ProdutoVendas } from "../types"

export function mergeProductSalesData(
    currentData: ProdutoVendas[],
    newData: ProdutoVendas[]
  ): ProdutoVendas[] {
    const mergedData = [...currentData]
    
    newData.forEach(newItem => {
      const existingIndex = mergedData.findIndex(
        item => item.produto === newItem.produto
      )
      existingIndex >= 0 
        ? mergedData[existingIndex] = newItem
        : mergedData.push(newItem)
    })
  
    return mergedData
  }