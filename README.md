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

Acesse: http://localhost:3000

### 🏗️ Build para produção
```bash
npm run build
npm run start
# ou
yarn build
yarn start
```

---

## 📋 Documentação Técnica

### 🚀 Instruções para Execução

#### Ambiente de Desenvolvimento
```bash
npm install  # Instala dependências
npm run dev  # Inicia servidor local
```

---

## 🧠 Decisões Técnicas

### 🧱 Stack Principal  
- **Next.js** (App Router)  
- **TypeScript**  
- **Tailwind CSS**  
- **shadcn/ui** (Componentes UI)  

### 📊 Visualização de Dados  
- **Chart.js** + **react-chartjs-2**  
- Custom hooks para manipulação de dados  

### 🎨 Estilização  
- Sistema de temas claro/escuro  
- Totalmente responsivo  
- Animações com Lottie  

### 🛠️ Funcionalidades Principais  
- Upload e visualização de dados  
- Filtros interativos  
- Multiplos tipos de gráficos  
- Exportação de relatórios  

### 🏗️ Arquitetura
- **Next.js App Router**: Para roteamento moderno e renderização híbrida
- **Padrão Modular**: Componentes autocontidos com responsabilidades únicas
- **Separação Clara**:
  - UI (components/)
  - Lógica (lib/)
  - Dados (constants/)

### 📚 Bibliotecas Principais
| Biblioteca | Finalidade | Benefício |
|------------|------------|-----------|
| Chart.js | Visualização de dados | Performance e customização |
| react-chartjs-2 | Integração React | Componentização dos gráficos |
| next-themes | Gerenciamento de temas | Suporte a system preference |
| shadcn/ui | Componentes UI | Acessibilidade e consistência |
| lottie-react | Animações | Experiência mais rica |

### 🏆 Diferenciais Implementados
1. **Sistema de Temas Avançado**
   - Respeita preferência do sistema
   - Transições suaves
   - Cores semanticamente nomeadas

2. **Performance Otimizada**
   - Code splitting automático
   - Memoização de gráficos
   - Carregamento lazy de componentes

3. **Experiência do Desenvolvedor**
   - TypeScript estrito
   - ESLint + Prettier padronizados
   - Husky para pre-commit hooks

---

## 🛠️ Guia de Manutenção

### Adicionando Novo Tipo de Gráfico
1. Crie componente em `/components/charts`
2. Adicione tipo em `/types/chart-types.ts`
3. Registre opção em `ChartSelector`

### Testes
```bash
npm run test  # Executa testes unitários
npm run lint  # Verifica padrões de código
```

### Deployment
Configuração pronta para:
- Vercel
- Netlify
- Docker (via `Dockerfile`)

---

## 📂 Estrutura do Projeto

```
/src
  /app                  # Rotas da aplicação (Next.js App Router)
  
  /components           # Componentes reutilizáveis
    /charts             # Componentes de gráficos
    /controls           # Controles UI (filtros, botões)
    /data               # Componentes de manipulação de dados
    /layout             # Componentes estruturais
  
  /lib                  # Utilitários e helpers
    /chart-utils        # Configurações e utilitários de gráficos
    /data-utils         # Funções para processamento de dados
  
  /types                # Tipos TypeScript
  /constants            # Dados e configurações
    /sample-data        # Dados de exemplo
  
  /public               # Assets públicos
    /animations         # Animações Lottie
    /images             # Imagens estáticas
```
