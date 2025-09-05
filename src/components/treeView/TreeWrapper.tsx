import React, { useState } from 'react';
import './style.css';

interface TreeWrapperProps {
  value: any;
  path?: (string|number)[];
  renderLeaf: (props: { value: any; path: (string|number)[]; name?: string | number; type: string; onEdit?: () => void; expanded?: boolean; onToggle?: () => void; }) => React.ReactNode;
  onEdit?: (value: any, path: (string|number)[]) => void;
  name?: string | number;
  editable?: boolean;
  style?: React.CSSProperties;
  iconExpand?: React.ReactNode;
  iconCollapse?: React.ReactNode;
  expanded?: boolean;
  onToggle?: () => void;
}

const getType = (value: unknown): string => {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
};

const TreeWrapper: React.FC<TreeWrapperProps> = ({ value, path = [], renderLeaf, onEdit, name, editable, style, iconExpand, iconCollapse, expanded: expandedProp, onToggle: onToggleProp }) => {
  const type = getType(value);
  const [expandedState, setExpandedState] = useState(true);
  const expanded = expandedProp !== undefined ? expandedProp : expandedState;
  const onToggle = onToggleProp !== undefined ? onToggleProp : () => setExpandedState((prev) => !prev);
  const iconOpen = iconExpand ?? <span style={{ fontWeight: 'bold' }}>-</span>;
  const iconClosed = iconCollapse ?? <span style={{ fontWeight: 'bold' }}>+</span>;

  // Calcula o nível da árvore (root = 0)
  const level = path.length;
  const btnLevelClass = `rv-tree-toggle-btn-level-${level > 4 ? 4 : level}`;

  // Badge para header
  let badge = null;
  if (level === 0) {
    badge = <span className="rv-badge rv-badge-root">Root</span>;
  } else if (level === 1) {
    badge = <span className="rv-badge rv-badge-reducer">Reducer</span>;
  } else if (level > 1) {
    badge = <span className="rv-badge rv-badge-state">State</span>;
  }

  if (type === 'array') {
    // Para arrays, renderiza header e botão de edição
    return (
      <div className="rv-tree-container">
        <div className="rv-tree-header">
          <button
            className={`rv-tree-toggle-btn ${btnLevelClass}`}
            onClick={onToggle}
            title={expanded ? 'Colapsar' : 'Expandir'}
          >
            {expanded ? iconOpen : iconClosed}
          </button>
          <span className="rv-tree-label">{name ?? '[Array]'}</span>
          {badge}
          <button
            className="rv-item-tree-edit-btn"
            onClick={onEdit ? () => onEdit(value, path) : undefined}
            title="Editar array"
          >
            ✏️
          </button>
        </div>
        {expanded && value.map((item: any, idx: number) => (
          <TreeWrapper
            key={idx}
            value={item}
            path={[...path, idx]}
            renderLeaf={renderLeaf}
            onEdit={onEdit}
            name={idx}
            editable={editable}
            style={style}
            iconExpand={iconExpand}
            iconCollapse={iconCollapse}
          />
        ))}
      </div>
    );
  }
  if (type === 'object') {
    // Para objetos, renderiza header e botão de edição
    return (
      <div className="rv-tree-container">
        <div className="rv-tree-header">
          <button
            className={`rv-tree-toggle-btn ${btnLevelClass}`}
            onClick={onToggle}
            title={expanded ? 'Colapsar' : 'Expandir'}
          >
            {expanded ? iconOpen : iconClosed}
          </button>
          <span className="rv-tree-label">{name ?? '{Object}'}</span>
          {badge}
          <button
            className="rv-item-tree-edit-btn"
            onClick={onEdit ? () => onEdit(value, path) : undefined}
            title="Editar objeto"
          >
            ✏️
          </button>
        </div>
        {expanded && Object.entries(value).map(([k, v]) => (
          <TreeWrapper
            key={k}
            value={v}
            path={[...path, k]}
            renderLeaf={renderLeaf}
            onEdit={onEdit}
            name={k}
            editable={editable}
            style={style}
            iconExpand={iconExpand}
            iconCollapse={iconCollapse}
          />
        ))}
      </div>
    );
  }
  // Renderiza folha (primitivo)
  return (
    <div className="rv-tree-leaf">
      {renderLeaf({ value, path, name, type, onEdit: editable && onEdit ? () => onEdit(value, path) : undefined, expanded, onToggle })}
    </div>
  );
};

export default TreeWrapper;
