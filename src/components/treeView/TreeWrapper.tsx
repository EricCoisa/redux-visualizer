import React, { useState } from 'react';
import EditButton from '../common/EditButton';
import { BadgeFactory } from '../common/Badge';
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
  storeKeys?: string[];
  initializeExpanded?: boolean;
  isModalOpen?: boolean; // Nova propriedade
}

const getType = (value: unknown): string => {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
};

const TreeWrapper: React.FC<TreeWrapperProps> = ({ value, path = [], renderLeaf, onEdit, name, editable, style, iconExpand, iconCollapse, expanded: expandedProp, onToggle: onToggleProp, storeKeys, isModalOpen = false, initializeExpanded = false }) => {
  const type = getType(value);
  const [expandedState, setExpandedState] = useState(initializeExpanded);
  const expanded = expandedProp !== undefined ? expandedProp : expandedState;
  const onToggle = onToggleProp !== undefined ? onToggleProp : () => setExpandedState((prev) => !prev);
  const iconOpen = iconExpand ?? <span style={{ fontWeight: 'bold' }}>-</span>;
  const iconClosed = iconCollapse ?? <span style={{ fontWeight: 'bold' }}>+</span>;

  const level = path.length;
  const btnLevelClass = `rv-tree-toggle-btn-level-${level > 4 ? 4 : level}`;
  
  const badge = BadgeFactory.getBadge(level, name, storeKeys);

  if (type === 'array' && Array.isArray(value)) {
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
          <EditButton
            onEdit={onEdit ? () => onEdit(value, path) : undefined}
            variant="tree"
            title="Editar array"
            isModalOpen={isModalOpen}
          />
        </div>
        {expanded && value?.map?.((item: any, idx: number) => (
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
            storeKeys={storeKeys} // Propagando storeKeys
            isModalOpen={isModalOpen} // Propagando isModalOpen
          />
        ))}
      </div>
    );
  }
  if (type === 'object' && value && typeof value === 'object') {
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
          <EditButton
            onEdit={onEdit ? () => onEdit(value, path) : undefined}
            variant="tree"
            title="Editar objeto"
            isModalOpen={isModalOpen}
          />
        </div>
        {expanded && Object.entries(value ?? {}).map(([k, v]) => {
          return (
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
              storeKeys={storeKeys} // Propagando storeKeys
              isModalOpen={isModalOpen} // Garantindo propagação de isModalOpen
            />
          );
        })}
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
