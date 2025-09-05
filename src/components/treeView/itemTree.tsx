import React from 'react';
import EditButton from '../common/EditButton';
import './style.css';

export interface ItemTreeProps {
  name: string;
  value: unknown;
  type: string;
  expanded?: boolean;
  onToggle?: () => void;
  onEdit?: () => void;
  badge?: React.ReactNode;
  isModalOpen?: boolean; // Adicionado para controlar a exibição do botão de edição
}

const ItemTree: React.FC<ItemTreeProps> = ({ name, value, type, expanded, onToggle, onEdit, badge, isModalOpen }) => {
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
        {!onToggle && (
          <span className="rv-item-tree-value" style={{ marginRight: 8 }}>{JSON.stringify(value)}</span>
        )}
        <EditButton
          onEdit={onEdit}
          variant="tree"
          title={`Editar ${type}`}
          style={{ marginLeft: 'auto' }}
          isModalOpen={isModalOpen}
        />
      </div>
    </div>
  );
};

export default ItemTree;
