import React from 'react';
import TreeWrapper from './TreeWrapper';
import './style.css';

interface ValueEditorProps {
  value: any;
  path?: (string|number)[];
  onChange: (newValue: any, path: (string|number)[]) => void;
}

const ValueEditor: React.FC<ValueEditorProps> = ({ value, path = [], onChange }) => {
  // Função para renderizar folha editável
  const renderLeaf = ({ value, path, name, type }: any) => {
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
    />
  );
};

export default ValueEditor;
