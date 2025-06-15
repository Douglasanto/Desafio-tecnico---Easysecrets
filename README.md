# 📊 Desafio EasySecrets - Visualizador de Vendas

Este projeto é um visualizador de dados que permite importar arquivos, analisar os dados graficamente e visualizar estatísticas de forma interativa, leve e responsiva.

---

## 🚀 Instruções para rodar o projeto

### ✅ Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### 📦 Instalação

```bash
git clone https://github.com/seu-usuario/desafio-easysecrets.git
cd desafio-easysecrets
npm install
# ou
yarn install
```

### ▶️ Rodando em ambiente de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

```bash
http://localhost:3000
```

## 🧠 Decisões Técnicas

### 🧱 Framework  
**Next.js**  
Utilizado como base do projeto por oferecer renderização híbrida (SSR + SSG), roteamento automático e excelente performance.

### 🟦 Linguagem  
**TypeScript**  
Adotado para trazer tipagem estática, melhor manutenção e segurança durante o desenvolvimento.

### 💨 Estilização  
**Tailwind CSS**  
Framework utilitário de CSS que facilita a criação de componentes estilizados e responsivos de forma rápida e eficiente.

### 📈 Gráficos e Visualização de Dados  
**chart.js + react-chartjs-2**  
Ferramentas para construção de gráficos dinâmicos e interativos.

### 🧩 Upload de Arquivos  
**react-dropzone**  
Biblioteca de upload com suporte a drag-and-drop, tornando a experiência de importação de arquivos mais amigável.

### ✨ Animações  
**lottie-react**  
Utilizado para incluir animações vetoriais de forma leve e integrada com o React, como gráficos animados no Hero Section.

### 🌓 Suporte a Temas  
**next-themes**  
Permite alternar entre modo claro e escuro automaticamente ou via botão, com persistência da escolha.

### 🔧 Utilitários  
**lodash**  
Biblioteca de utilidades usada para manipulação eficiente de arrays e objetos.


## 📁 Estrutura de Pastas

```bash
.
├── public/ 
│   ├── animations/              
├── src/
│   ├── app/           
│   ├── components/      
│   ├── types/           
├── tailwind.config.js   
├── tsconfig.json        
├── package.json         