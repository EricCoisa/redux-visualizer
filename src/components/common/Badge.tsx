import React from 'react';

interface BadgeProps {
  type: 'root' | 'reducer' | 'state';
  children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ type, children }) => {
  const classMap = {
    root: 'rv-badge rv-badge-root',
    reducer: 'rv-badge rv-badge-reducer',
    state: 'rv-badge rv-badge-state'
  };

  const textMap = {
    root: 'Root',
    reducer: 'Reducer',
    state: 'State'
  };

  return (
    <span className={classMap[type]}>
      {children || textMap[type]}
    </span>
  );
};

const BadgeFactory = {
  /**
   * Cria o badge apropriado baseado no nível e nome do nó
   * @param level - Nível na árvore (0 = root)
   * @param name - Nome do nó
   * @param storeKeys - Chaves dos reducers
   */
  getBadge: (level: number, name: string | number | undefined, storeKeys?: string[]): React.ReactElement => {
    if (level === 0) {
      return <Badge type="root" />;
    }
    
    if (name !== undefined && storeKeys?.includes(String(name))) {
      return <Badge type="reducer" />;
    }
    
    return <Badge type="state" />;
  }
};

export default Badge;
export { BadgeFactory };
export type { BadgeProps };
