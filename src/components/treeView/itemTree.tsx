

import React from 'react';
import './style.css';

export interface ItemTreeProps {
  name: string;
  value: unknown;
  type: string;
  expanded?: boolean;
  onToggle?: () => void;
  onEdit?: () => void;
  badge?: React.ReactNode;
}

const ItemTree: React.FC<ItemTreeProps> = ({ name, value, type, expanded, onToggle, onEdit, badge }) => {
  return (
    <div className="rv-item-tree-view">
      <div className="rv-item-tree-content">
        {onToggle && (
          <button className="rv-item-tree-toggle" onClick={onToggle}>
            {expanded ? '-' : '+'}
          </button>
        )}
        <span className="rv-item-tree-name">{name}</span>
        <span className="rv-item-tree-type">({type})</span>
        {badge}
        <button className="rv-item-tree-edit-btn" onClick={onEdit} title={`Editar ${type}`}>✏️</button>
        {!onToggle && (
          <span className="rv-item-tree-value">{JSON.stringify(value)}</span>
        )}
      </div>
    </div>
  );
};

export default ItemTree;
