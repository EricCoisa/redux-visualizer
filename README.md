# Redux Visualizer

Visualize, explore e prepare para editar o estado do Redux em tempo real, diretamente na sua aplicação React.

## Recursos

- Modal arrastável e redimensionável.
- Visualização recursiva do estado global do Redux.
- Expansão/colapso de objetos e arrays.
- Scroll automático para grandes volumes de dados.
- Overlay opcional.
- Edição de estados.

## Instalação

```bash
npm install redux-visualizer
```

## Uso

1. Importe e adicione o componente no seu app:

```tsx
import ReduxVisualizer from 'redux-visualizer';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir Visualizador Redux</button>
      <ReduxVisualizer isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
```

2. Certifique-se de que sua store Redux está configurada em `src/store.ts` e envolva seu app com `<Provider store={store}>`.

## Customização

- O modal pode ser arrastado e redimensionado.
- O overlay pode ser desativado via prop: `<ReduxVisualizer overlay={false} ... />`
- O estado da árvore é preservado entre aberturas.

## Roadmap

- Edição de estados diretamente pelo visualizador.
- Suporte a múltiplos stores.
- Exportação/importação de estados.

## Licença

MIT
