'use client'

import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import DataFormModal from './DataFormModal'
import { ProdutoVendas } from '@/types'
import Lottie from "lottie-react"
import graphAnimation from "../../public/animations/Animation - 1750010812179.json";

interface HeroSectionProps {
  onDataUpload: (data: ProdutoVendas[]) => void
}

export default function HeroSection({ onDataUpload }: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="w-full min-h-screen flex flex-col bg-background text-foreground">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Graficos
        </h1>
        <ThemeToggle />
      </header>

      <div className="flex-1 container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12 py-12">
        <div className="text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Venha ver como suas vendas estão!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Visualize e analise seus dados de forma simples e intuitiva.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-foreground text-primary hover:bg-accent px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border"
          >
            Começar Agora
          </button>
        </div>

        <div className="w-full max-w-lg">
         <Lottie 
  animationData={graphAnimation} 
  loop 
  className="w-full h-auto"
/>
        </div>
      </div>

      <DataFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onDataSubmit={onDataUpload}
      />
    </section>
  )
}