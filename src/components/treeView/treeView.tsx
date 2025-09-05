import React, { useState, useEffect } from 'react';
import ItemTree from './itemTree';
import TreeWrapper from './TreeWrapper';
import EditValueModal from './editValueModal';
import { useSelector, useDispatch } from 'react-redux';
import { setEntireState } from '../../store/setEntireState';
import './style.css';
function updateValueAtPath(obj: any, path: (string|number)[], newValue: any): any {
  if (!path || path.length === 0) return newValue;
  const [head, ...rest] = path;
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  copy[head] = rest.length === 0 ? newValue : updateValueAtPath(copy[head], rest, newValue);
  return copy;
}

const TreeView: React.FC = () => {
  const reduxState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [localState, setLocalState] = useState<any>(reduxState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editValue, setEditValue] = useState<any>('');
  const [editPath, setEditPath] = useState<(string|number)[] | null>(null);

  useEffect(() => {
    setLocalState(reduxState);
  }, [reduxState]);

  const handleEditRequest = (value: unknown, path: (string|number)[]) => {
    console.log('handleEditRequest', { value, path });
    setEditValue(value);
    setEditPath(path);
    setIsModalOpen(true);
  };

  const handleSave = (newValue: any) => {
    if (editPath) {
      // Atualiza o estado global do Redux
      const updatedState = updateValueAtPath(reduxState, editPath, newValue);
      dispatch(setEntireState(updatedState));
    }
    setIsModalOpen(false);
    setEditPath(null);
  };


  return (
    <div className="rv-tree-view">
      <div className="rv-state-header">
        <span className="rv-badge rv-badge-root">Root</span>
        <button
          className="rv-state-edit-btn"
          title="Editar estado"
          onClick={() => handleEditRequest(localState, [])}
        >
          <span role="img" aria-label="editar">✏️</span>
        </button>
      </div>
      <TreeWrapper
        value={reduxState}
        path={[]}
        renderLeaf={({ value, path, name, type, expanded: isExpanded, onToggle }) => {
          const canExpand = type === 'array' || type === 'object';
          // Badge logic
          let badge = null;
          if (path.length === 1) {
            badge = <span className="rv-badge rv-badge-reducer">Reducer</span>;
          } else if (path.length > 1) {
            badge = <span className="rv-badge rv-badge-state">State</span>;
          }
          return (
            <ItemTree
              name={String(name)}
              value={value}
              type={type}
              expanded={canExpand ? isExpanded : undefined}
              onToggle={canExpand ? onToggle : undefined}
              onEdit={() => handleEditRequest(value, path)}
              badge={badge}
            />
          );
        }}
        expanded={true}
        style={{}}
        iconExpand={<span style={{ fontWeight: 'bold' }}>-</span>}
        iconCollapse={<span style={{ fontWeight: 'bold' }}>+</span>}
        onEdit={handleEditRequest}
      />
      <EditValueModal
        isOpen={isModalOpen}
        initialValue={editValue}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TreeView;
