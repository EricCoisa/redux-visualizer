# 🔍 Redux Visualizer

[English](./README.md) | [Português](./README.pt-BR.md)

[![npm version](https://img.shields.io/npm/v/redux-visualizer.svg)](https://www.npmjs.com/package/redux-visualizer)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/EricCoisa/redux-visualizer/blob/main/LICENCE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19+-61DAFB.svg)](https://reactjs.org)

> An interactive visual tool to inspect and edit Redux states in real-time

**Redux Visualizer** is a React modal component that allows you to **inspect, expand, and edit Redux states** in real-time. It displays the state as an **interactive tree** and offers complete support for editing values of any type, making the debugging and visualization process simpler and more intuitive.

---

## 🎥 Demo

[Redux-Visualizer Demo](https://redux.ericvitor.com.br/)

---

## ✨ Key Features

- ✨ **Tree Visualization**: States displayed as expandable hierarchical structure
- ⚡ **Real-time Editing**: Edit strings, numbers, booleans, objects, and arrays directly
- 🎨 **Smart Types**: Automatically detects hex/rgb colors with visual color picker
- 📱 **Interactive Modal**: Draggable, resizable, and responsive
- 🏷️ **Visual Badges**: Visually distinguishes Reducers, States, and Root
- 🔄 **Auto Sync**: Changes reflect immediately in Redux

---

## 📦 Installation

Install via npm or yarn:

```bash
npm install redux-visualizer
# or
yarn add redux-visualizer
```

---

## 🚀 Basic Usage

### Simple Configuration

> **Important:** To enable editing the entire Redux state from the visualizer, you must add the following logic to your root reducer:

```typescript
import { VisualizerReducer } from 'redux-visualizer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  // ...your reducers
});

const rootReducer = VisualizerReducer(appReducer);
```

This ensures that the Redux Visualizer can overwrite the state when you use the edit feature.

```tsx
import React, { useState } from 'react';
import { ReduxVisualizer } from 'redux-visualizer';
import 'redux-visualizer/dist/style.css'; // Import styles

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        🔍 Open Redux Visualizer
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

### With Custom Store

```tsx
import { ReduxVisualizer } from 'redux-visualizer';
import { myCustomStore } from './store';

<ReduxVisualizer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  store={myCustomStore} // Pass your custom store - optional
/>
```

---

## ⚙️ Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| **isOpen** | boolean | false | Defines whether the modal is open or closed |
| **onClose** | () => void | - | Function called when closing the modal |
| **overlay** | boolean | false | Shows dark overlay behind the modal |
| **savePosition** | boolean | true | Saves position and size in localStorage |
| **store** | Store | - | Custom Redux store (optional) |

---

## 🔧 Advanced Features

### 🎨 Color Editing
Redux Visualizer automatically detects color values and offers a visual color picker:

```tsx
// Redux State
const state = {
  theme: {
    primaryColor: "#3B82F6",    // Hex colors
    bgColor: "rgb(255,0,0)"     // RGB colors
  }
}
```

### 🏷️ Badge System
- **🔹 Root**: Root node of the state
- **⚙️ Reducer**: Main reducer keys  
- **📄 State**: Internal state properties

### ⚡ Supported Editing Types
- ✍️ **String**: Text input
- 🔢 **Number**: Numeric input
- ✅ **Boolean**: Interactive checkbox
- 🎨 **Color**: Color picker (hex/rgb)
- 📦 **Object**: Hierarchical expansion
- 📋 **Array**: List visualization

---

## 📋 Peer Dependencies

This package requires the following dependencies in your project:

| Package | Recommended Version |
|---------|-------------------|
| **React** | ^19.1.1 |
| **React-dom** | ^19.1.1 |
| **Redux** | ^4.2.0 \|\| ^5.0.0 |
| **React-redux** | ^9.2.0 |
| **@reduxjs/toolkit** | ^2.9.0 |

### Installing Dependencies

```bash
npm install react react-dom redux react-redux @reduxjs/toolkit
```

---

## ⚙️ Development

### Available Scripts

```bash
# Development
npm run dev

```

### Build Output

The build generates the following files in `dist/`:

- **redux-visualizer.es.js** - ESM Module
- **redux-visualizer.umd.js** - UMD Module  
- **index.d.ts** - TypeScript types
- **style.css** - CSS styles

---

## 🎨 Customization

### CSS Customization

```css
/* Overriding modal styles */
.rv-modal-content {
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Customizing badge colors */
.rv-badge-reducer {
  background-color: #3B82F6;
}

.rv-badge-state {
  background-color: #10B981;
}
```

---

## 🤝 Contributing

Contributions are always **very welcome**! 

### How to Contribute

1. **Fork** the project
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. **Commit** your changes (`git commit -m 'feat: add new feature'`)
4. **Push** to the branch (`git push origin feature/new-feature`)
5. Open a **Pull Request**

### Guidelines

- Use **TypeScript** for all features
- Maintain **compatibility** with supported versions
- Add **tests** for new features
- Follow **clean code** standards
- Document **significant changes**

---

## 🐛 Reporting Bugs

Found a bug? Help us improve!

1. Check if the issue hasn't been already [reported](https://github.com/EricCoisa/redux-visualizer/issues)
2. Create a [new issue](https://github.com/EricCoisa/redux-visualizer/issues/new) with:
   - Redux Visualizer version
   - React/Redux version
   - Code to reproduce the issue
   - Expected vs actual behavior

---

## 📄 License

This project is licensed under the **[MIT License](./LICENCE)**.

---

## 👨‍💻 Author

**Eric Vitor**
- GitHub: [@EricCoisa](https://github.com/EricCoisa)

---

<div align="center">

**⭐ If this project helped you, consider giving it a star on GitHub!**

[⭐ Star on GitHub](https://github.com/EricCoisa/redux-visualizer) • [📦 NPM Package](https://www.npmjs.com/package/redux-visualizer) • [🐛 Report Bug](https://github.com/EricCoisa/redux-visualizer/issues)

</div>
