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

interface TreeViewProps {
  store?: any;
}

const TreeView: React.FC<TreeViewProps> = ({ store }) => {
  // Se store for passado manualmente, use ele, senão use o Redux padrão
  let reduxState: any = undefined;
  let dispatch: any = undefined;
  try {
    reduxState = store ? (typeof store.getState === 'function' ? store.getState() : store) : useSelector((state) => state);
    dispatch = store ? (typeof store.dispatch === 'function' ? store.dispatch : () => {}) : useDispatch();
  } catch {
    reduxState = undefined;
    dispatch = undefined;
  }
  const [localState, setLocalState] = useState<any>(reduxState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editValue, setEditValue] = useState<any>('');
  const [editPath, setEditPath] = useState<(string|number)[] | null>(null);

  useEffect(() => {
    setLocalState(reduxState ?? {});
  }, [reduxState]);

  if (reduxState === undefined || reduxState === null) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <span style={{ color: '#888', fontSize: 18, fontWeight: 500 }}>Redux not Found</span>
      </div>
    );
  }

  const handleEditRequest = (value: unknown, path: (string|number)[]) => {
    setEditValue(value);
    setEditPath(path);
    setIsModalOpen(true);
  };

  const handleSave = (newValue: any) => {
    if (editPath) {
      // Atualiza o estado global do Redux
      const updatedState = updateValueAtPath(reduxState ?? {}, editPath, newValue);
      if (dispatch) {
        dispatch(setEntireState(updatedState));
      }
    }
    setIsModalOpen(false);
    setEditPath(null);
  };

  console.log('TreeView - isModalOpen:', isModalOpen);

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
          console.log('TreeView renderLeaf - isModalOpen:', isModalOpen); // Log para verificar propagação
          return (
            <ItemTree
              name={String(name)}
              value={value}
              type={type}
              expanded={canExpand ? isExpanded : undefined}
              onToggle={canExpand ? onToggle : undefined}
              onEdit={() => handleEditRequest(value, path)}
            />
          );
        }}
        expanded={true}
        style={{}}
        iconExpand={<span style={{ fontWeight: 'bold' }}>-</span>}
        iconCollapse={<span style={{ fontWeight: 'bold' }}>+</span>}
        onEdit={handleEditRequest}
        storeKeys={Object.keys(reduxState ?? {})} // Passando storeKeys no nó raiz
        isModalOpen={isModalOpen} // Passando isModalOpen para o TreeWrapper
      />
      <EditValueModal
        isOpen={isModalOpen}
        initialValue={editValue}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
        storeKeys={Object.keys(reduxState ?? {})} // Passando storeKeys para o EditValueModal
        path={editPath} // Passando o path correto para o EditValueModal
      />
    </div>
  );
};

export default TreeView;
