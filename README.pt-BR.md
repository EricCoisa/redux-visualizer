# 🔍 Redux Visualizer

[English](./README.md) | [Português](./README.pt-BR.md)

[![npm version](https://img.shields.io/npm/v/redux-visualizer.svg)](https://www.npmjs.com/package/redux-visualizer)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/EricCoisa/redux-visualizer/blob/main/LICENCE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19+-61DAFB.svg)](https://reactjs.org)

> Uma ferramenta visual interativa para inspecionar e editar estados Redux em tempo real

**Redux Visualizer** é um componente React em forma de modal que permite **inspecionar, expandir e editar estados do Redux** em tempo real. Ele exibe o estado como uma **árvore interativa** e oferece suporte completo para edição de valores de qualquer tipo, tornando o processo de debug e visualização mais simples e intuitivo.

---

## ✨ Recursos Principais

- ✨ **Visualização em Árvore**: Estados exibidos como estrutura hierárquica expansível
- ⚡ **Edição em Tempo Real**: Edite strings, números, booleanos, objetos e arrays diretamente
- 🎨 **Tipos Inteligentes**: Detecta automaticamente cores hex/rgb com seletor visual
- 📱 **Modal Interativo**: Arrastável, redimensionável e responsivo
- 🏷️ **Badges Visuais**: Distingue visualmente Reducers, States e Root
- 🔄 **Sincronização Automática**: Mudanças refletem imediatamente no Redux

---

## 📦 Instalação

Instale via npm ou yarn:

```bash
npm install redux-visualizer
# ou
yarn add redux-visualizer
```

---

## 🚀 Uso Básico

### Configuração Simples

```tsx
import React, { useState } from 'react';
import { ReduxVisualizer } from 'redux-visualizer';
import 'redux-visualizer/dist/style.css'; // Importe os estilos

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        🔍 Abrir Redux Visualizer
      </button>
      
      <ReduxVisualizer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        overlay={true}
        savePosition={true}
      />
    </div>
  );
}
```

### Com Store Customizada

```tsx
import { ReduxVisualizer } from 'redux-visualizer';
import { myCustomStore } from './store';

<ReduxVisualizer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  store={myCustomStore} // Passa sua store customizada - opcional
/>
```

---

## ⚙️ Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|---------|-----------|
| **isOpen** | boolean | false | Define se o modal está aberto ou fechado |
| **onClose** | () => void | - | Função chamada ao fechar o modal |
| **overlay** | boolean | false | Exibe overlay escuro atrás do modal |
| **savePosition** | boolean | true | Salva posição e tamanho no localStorage |
| **store** | Store | - | Store Redux customizada (opcional) |

---

## 🔧 Funcionalidades Avançadas

### 🎨 Edição de Cores
O Redux Visualizer detecta automaticamente valores de cor e oferece um seletor visual:

```tsx
// Estado Redux
const state = {
  theme: {
    primaryColor: "#3B82F6",    // Hex colors
    bgColor: "rgb(255,0,0)"     // RGB colors
  }
}
```

### 🏷️ Sistema de Badges
- **🔹 Root**: Nó raiz do estado
- **⚙️ Reducer**: Chaves principais dos reducers  
- **📄 State**: Propriedades internas do estado

### ⚡ Tipos de Edição Suportados
- ✍️ **String**: Input de texto
- 🔢 **Number**: Input numérico
- ✅ **Boolean**: Checkbox interativo
- 🎨 **Color**: Seletor de cor (hex/rgb)
- 📦 **Object**: Expansão hierárquica
- 📋 **Array**: Visualização de lista

---

## 📋 Peer Dependencies

Este pacote requer as seguintes dependências no seu projeto:

| Pacote | Versão Recomendada |
|--------|-------------------|
| **React** | ^19.1.1 |
| **React-dom** | ^19.1.1 |
| **Redux** | ^4.2.0 \|\| ^5.0.0 |
| **React-redux** | ^9.2.0 |
| **@reduxjs/toolkit** | ^2.9.0 |

### Instalação das Dependências

```bash
npm install react react-dom redux react-redux @reduxjs/toolkit
```

---

## ⚙️ Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

```

### Build Output

A build gera os seguintes arquivos em `dist/`:

- **redux-visualizer.es.js** - Módulo ESM
- **redux-visualizer.umd.js** - Módulo UMD  
- **index.d.ts** - Tipos TypeScript
- **style.css** - Estilos CSS

---

## 🎨 Personalização

### CSS Customization

```css
/* Sobrescrevendo estilos do modal */
.rv-modal-content {
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Customizando cores dos badges */
.rv-badge-reducer {
  background-color: #3B82F6;
}

.rv-badge-state {
  background-color: #10B981;
}
```

---

## 🤝 Contribuindo

Contribuições são sempre **muito bem-vindas**! 

### Como Contribuir

1. **Fork** o projeto
2. Crie sua branch de feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

### Diretrizes

- Use **TypeScript** para todas as funcionalidades
- Mantenha a **compatibilidade** com as versões suportadas
- Adicione **testes** para novas funcionalidades
- Siga os padrões de **código limpo**
- Documente **mudanças significativas**

---

## 🐛 Reportando Bugs

Encontrou um bug? Ajude-nos a melhorar!

1. Verifique se o problema já não foi [reportado](https://github.com/EricCoisa/redux-visualizer/issues)
2. Crie uma [nova issue](https://github.com/EricCoisa/redux-visualizer/issues/new) com:
   - Versão do Redux Visualizer
   - Versão do React/Redux
   - Código para reproduzir o problema
   - Comportamento esperado vs atual

---

## 📄 Licença

Este projeto está licenciado sob a **[Licença MIT](./LICENCE)**.

---

## 👨‍💻 Autor

**Eric Vitor**
- GitHub: [@EricCoisa](https://github.com/EricCoisa)

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!**

[⭐ Star no GitHub](https://github.com/EricCoisa/redux-visualizer) • [📦 NPM Package](https://www.npmjs.com/package/redux-visualizer) • [🐛 Reportar Bug](https://github.com/EricCoisa/redux-visualizer/issues)

</div>
