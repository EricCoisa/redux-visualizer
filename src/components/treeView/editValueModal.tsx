import React, { useState } from 'react';
import './style.css';
import ValueEditor from './ValueEditor';
interface EditValueModalProps {
  isOpen: boolean;
  initialValue: any;
  onSave: (value: any) => void;
  onClose: () => void;
  storeKeys: (string | number)[]; // Adicionado storeKeys aqui
}

const EditValueModal: React.FC<EditValueModalProps> = ({ isOpen, initialValue, onSave, onClose, storeKeys }) => {
  const [value, setValue] = useState<any>(initialValue);

  // Sincroniza o valor inicial sempre que o modal for aberto ou o valor mudar
  React.useEffect(() => {
    if (isOpen) {
      setValue(initialValue);
    }
  }, [isOpen, initialValue]);

  if (!isOpen) return null;

  // Função para atualizar valor recursivamente
  const updateValueAtPath = (newVal: any, updatePath: (string|number)[]) => {
    // Debug - vamos ver o que está sendo passado
    console.log('updateValueAtPath:', { newVal, updatePath, currentValue: value });
    
    if (updatePath.length === 0) {
      setValue(newVal);
      return;
    }
    
    const [head, ...rest] = updatePath;
    setValue((prev: any) => {
      console.log('Updating prev:', prev, 'at path:', updatePath);
      const copy = Array.isArray(prev) ? [...prev] : { ...prev };
      copy[head] = rest.length === 0 ? newVal : updateValueAtPathHelper(copy[head], rest, newVal);
      console.log('Result:', copy);
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
       
          <span className="rv-edit-modal-title">Edit</span>
          <span className="rv-modal-header-spacer" />
            
          <button className="rv-edit-modal-btn rv-edit-modal-btn-primary" onClick={() => onSave(value)} title="Save">Save</button>
          <button className="rv-modal-close" onClick={onClose} title="Close">X</button>
        </div>
        <div className="rv-modal-body">
          <ValueEditor
            value={value}
            path={[]} // Sempre começar do root dentro do modal
            onChange={(newVal, updatePath) => {
              console.log('ValueEditor onChange:', { newVal, updatePath });
              updateValueAtPath(newVal, updatePath);
            }}
            storeKeys={storeKeys?.map(String)} // Convertendo storeKeys para string[]
          />
        </div>
      </div>
    </div>
  );
};

export default EditValueModal;
