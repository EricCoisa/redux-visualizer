import React from 'react';
import TreeWrapper from './TreeWrapper';
import './style.css';

interface ValueEditorProps {
  value: any;
  path?: (string|number)[] ;
  onChange: (newValue: any, path: (string|number)[]) => void;
  storeKeys?: string[]; // Adicionando storeKeys
}

const ValueEditor: React.FC<ValueEditorProps> = ({ value, path = [], onChange, storeKeys }) => {
  // Função para renderizar folha editável
  const renderLeaf = ({ value, path, name, type }: any) => {
    // Detecta cor hex ou rgb
    const isColorString =
      typeof value === 'string' &&
      (value.match(/^#([0-9a-fA-F]{3,8})$/) || value.match(/^rgb\s*\((\s*\d+\s*,){2}\s*\d+\s*\)$/));

    if (type === 'string' && isColorString) {
      // Hex: input type=color
      if (value.startsWith('#')) {
        return (
          <div className="rv-value-editor-field">
            {name !== undefined && <span className="rv-value-editor-label">{name}</span>}
            <input
              type="color"
              className="rv-value-editor-input"
              value={value}
              onChange={e => onChange(e.target.value, path)}
            />
            <span className="rv-value-editor-other">{value}</span>
          </div>
        );
      }
      // rgb: converte para hex para input type=color
      if (value.startsWith('rgb')) {
        const rgb = value.match(/\d+/g)?.map(Number) ?? [0,0,0];
        const hex = '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
        return (
          <div className="rv-value-editor-field">
            {name !== undefined && <span className="rv-value-editor-label">{name}</span>}
            <input
              type="color"
              className="rv-value-editor-input"
              value={hex}
              onChange={e => {
                onChange(e.target.value, path);
              }}
            />
            <span className="rv-value-editor-other">{value}</span>
          </div>
        );
      }
    }
    if (type === 'string') {
      return (
        <div className="rv-value-editor-field">
          {name !== undefined && <span className="rv-value-editor-label">{name}</span>}
          <input
            className="rv-value-editor-input rv-value-editor-input-text"
            type="text"
            value={value}
            onChange={e => onChange(e.target.value, path)}
          />
        </div>
      );
    }
    if (type === 'number') {
      return (
        <div className="rv-value-editor-field">
          {name !== undefined && <span className="rv-value-editor-label">{name}</span>}
          <input
            className="rv-value-editor-input rv-value-editor-input-number"
            type="number"
            value={value}
            onChange={e => onChange(Number(e.target.value), path)}
          />
        </div>
      );
    }
    if (type === 'boolean') {
      return (
        <div className="rv-value-editor-field">
          {name !== undefined && <span className="rv-value-editor-label">{name}</span>}
          <label className="rv-value-editor-checkbox-label">
            <input
              type="checkbox"
              checked={value}
              onChange={e => onChange(e.target.checked, path)}
            />
            {value ? 'true' : 'false'}
          </label>
        </div>
      );
    }
    // Para objetos e arrays, só mostra o nome
    if (type === 'array' || type === 'object') {
      return (
        <div className="rv-value-editor-group-field">
          {name !== undefined && <span className="rv-value-editor-label">{name}</span>}
        </div>
      );
    }
    return <span className="rv-value-editor-other">{String(value)}</span>;
  };

  return (
    <TreeWrapper
      value={value}
      path={path}
      renderLeaf={renderLeaf}
      editable={true}
      onEdit={(_, __) => {}}
      storeKeys={storeKeys} // Passando storeKeys para TreeWrapper
      isModalOpen={true} // Sempre true no ValueEditor para esconder botões de edição aninhados
      name={path[path.length - 1]} // Passando o nome do nó atual
      initializeExpanded={true}
    />
  );
};

export default ValueEditor;
