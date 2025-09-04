import React, { useState } from 'react';
import './style.css';
import ValueEditor from './ValueEditor';
interface EditValueModalProps {
  isOpen: boolean;
  initialValue: any;
  onSave: (value: any) => void;
  onClose: () => void;
}

const getType = (value: unknown): string => {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
};

const EditValueModal: React.FC<EditValueModalProps> = ({ isOpen, initialValue, onSave, onClose }) => {
  const [value, setValue] = useState<any>(initialValue);

  // Sincroniza o valor inicial sempre que o modal for aberto ou o valor mudar
  React.useEffect(() => {
    if (isOpen) {
      setValue(initialValue);
    }
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  // Função para atualizar valor recursivamente
  const updateValueAtPath = (newVal: any, path: (string|number)[]) => {
    if (path.length === 0) {
      setValue(newVal);
      return;
    }
    const [head, ...rest] = path;
    setValue((prev: any) => {
      const copy = Array.isArray(prev) ? [...prev] : { ...prev };
      copy[head] = rest.length === 0 ? newVal : updateValueAtPathHelper(copy[head], rest, newVal);
      return copy;
    });
  };

  // Helper para atualização recursiva
  const updateValueAtPathHelper = (obj: any, path: (string|number)[], newVal: any): any => {
    if (path.length === 0) return newVal;
    const [head, ...rest] = path;
    const copy = Array.isArray(obj) ? [...obj] : { ...obj };
    copy[head] = updateValueAtPathHelper(copy[head], rest, newVal);
    return copy;
  };

  return (
    <div className="rv-edit-modal-overlay">
      <div className="rv-edit-modal-content">
        <div className="rv-modal-header">
          <button className="rv-modal-close" onClick={onClose} title="Cancelar">Cancelar</button>
          <span className="rv-edit-modal-title">Editar Valor</span>
          <span className="rv-modal-header-spacer" />
          <button className="rv-edit-modal-btn rv-edit-modal-btn-primary" onClick={() => onSave(value)} title="Salvar">Salvar</button>
        </div>
        <div className="rv-modal-body">
          <ValueEditor
            value={value}
            onChange={(newVal, path) => updateValueAtPath(newVal, path)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditValueModal;
