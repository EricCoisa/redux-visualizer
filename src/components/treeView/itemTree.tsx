

import React from 'react';

export interface ItemTreeProps {
  name: string;
  value: unknown;
  type: string;
  expanded?: boolean;
  onToggle?: () => void;
}

const ItemTree: React.FC<ItemTreeProps> = ({ name, value, type, expanded, onToggle }) => {
  return (
    <div className="rv-item-tree-view" style={{ marginLeft: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {onToggle && (
          <button onClick={onToggle} style={{ marginRight: 4 }}>
            {expanded ? '-' : '+'}
          </button>
        )}
        <span style={{ fontWeight: 'bold' }}>{name}</span>
        <span style={{ marginLeft: 8, color: '#888' }}>({type})</span>
        <button style={{ marginLeft: 8 }} disabled title="Editar (em breve)">✏️</button>
        {!onToggle && (
          <span style={{ marginLeft: 24 }}>{JSON.stringify(value)}</span>
        )}
      </div>
    </div>
  );
};

export default ItemTree;
