

import React, { useState } from 'react';
import ItemTree from './itemTree';
import { useSelector } from 'react-redux';

function getType(value: unknown): string {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
}

const isExpandable = (value: unknown): value is object => typeof value === 'object' && value !== null;

function TreeView() {
  const state = useSelector((state) => state);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderChildren = (value: unknown, path: (string|number)[] = []) => {
    if (Array.isArray(value)) {
      return value.map((item, idx) => {
        const key = [...path, idx].join('.');
        const type = getType(item);
        const canExpand = isExpandable(item);
        return (
          <React.Fragment key={key}>
            <ItemTree
              name={String(idx)}
              value={item}
              type={type}
              expanded={!!expanded[key]}
              onToggle={canExpand ? () => handleToggle(key) : undefined}
            />
            {canExpand && expanded[key] && (
              <div>{renderChildren(item, [...path, idx])}</div>
            )}
          </React.Fragment>
        );
      });
    } else if (isExpandable(value)) {
      return Object.entries(value as object).map(([k, v]) => {
        const key = [...path, k].join('.');
        const type = getType(v);
        const canExpand = isExpandable(v);
        return (
          <React.Fragment key={key}>
            <ItemTree
              name={k}
              value={v}
              type={type}
              expanded={!!expanded[key]}
              onToggle={canExpand ? () => handleToggle(key) : undefined}
            />
            {canExpand && expanded[key] && (
              <div>{renderChildren(v, [...path, k])}</div>
            )}
          </React.Fragment>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <div className="rv-tree-view">
      {renderChildren(state)}
    </div>
  );
}

export default TreeView;
