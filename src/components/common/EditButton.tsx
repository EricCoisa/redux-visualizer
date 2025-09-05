import React from 'react';

interface EditButtonProps {
  onEdit?: () => void;
  disabled?: boolean;
  variant?: 'tree' | 'state' | 'root';
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  isModalOpen?: boolean;
}

const EditButton: React.FC<EditButtonProps> = ({ 
  onEdit, 
  disabled = false, 
  variant = 'tree',
  title = 'Editar',
  className = '',
  style = {},
  isModalOpen = false
}) => {
  // Se o modal estiver aberto, não renderiza o botão
  if (isModalOpen) {
    return null;
  }

  const baseClass = 'rv-edit-btn';
  const variantClass = `rv-edit-btn-${variant}`;
  
  // Mapeamento de classes antigas para manter compatibilidade
  const legacyClassMap = {
    tree: 'rv-item-tree-edit-btn',
    state: 'rv-state-edit-btn',
    root: 'rv-state-edit-btn'
  };
  
  const finalClassName = `${baseClass} ${variantClass} ${legacyClassMap[variant]} ${className}`.trim();
  
  return (
    <button 
      className={finalClassName}
      onClick={onEdit}
      disabled={disabled}
      title={title}
      style={style}
    >
      ✏️
    </button>
  );
};

export default EditButton;
export type { EditButtonProps };
