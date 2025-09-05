import React, { useRef, useState } from "react";
import TreeView from "../treeView/treeView";
import "./style.css";

interface ReduxVisualizerProps {
  isOpen: boolean;
  onClose: () => void;
  overlay?: boolean;
  savePosition?: boolean;
  store?: any;
}


function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(val, max));
}


const ReduxVisualizer: React.FC<ReduxVisualizerProps> = ({ isOpen, onClose, overlay = false, savePosition = true, store }) => {
  // Carrega posição e tamanho do localStorage se savePosition
  const getSaved = () => {
    if (!savePosition) return null;
    try {
      const raw = localStorage.getItem('rv-visualizer-pos');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch { return null; }
  };
  const saved = getSaved();
  const [position, setPosition] = useState(saved?.position ?? { top: 80, left: 80 });
  const [size, setSize] = useState<{ width: number; height: number }>(saved?.size ?? { width: 400, height: 300 });
  const [resizing, setResizing] = useState(false);
  const resizeStart = useRef<{ x: number; y: number; width: number; height: number }>({ x: 0, y: 0, width: 0, height: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    dragOffset.current = {
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    };
    document.body.style.userSelect = "none";
  };


  // Atualiza posição se a tela for redimensionada
  // Salva posição/tamanho no localStorage se savePosition
  React.useEffect(() => {
    if (!savePosition) return;
    localStorage.setItem('rv-visualizer-pos', JSON.stringify({ position, size }));
  }, [position, size, savePosition]);

  React.useEffect(() => {
    const handleResize = () => {
      setPosition((pos: { top: number; left: number }) => {
        const maxLeft = window.innerWidth - size.width;
        const maxTop = window.innerHeight - size.height;
        return {
          top: clamp(pos.top, 0, maxTop),
          left: clamp(pos.left, 0, maxLeft),
        };
      });
      setSize((sz) => {
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;
        return {
          width: Math.min(sz.width, maxWidth),
          height: Math.min(sz.height, maxHeight),
        };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [size.width, size.height]);
  // Resize handlers
  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setResizing(true);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
    document.body.style.userSelect = "none";
  };

  React.useEffect(() => {
    if (!resizing) return;
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - resizeStart.current.x;
      const dy = e.clientY - resizeStart.current.y;
      const minWidth = 320;
      const minHeight = 200;
      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;
  const newWidth = clamp(resizeStart.current.width + dx, minWidth, maxWidth);
  const newHeight = clamp(resizeStart.current.height + dy, minHeight, maxHeight);
      setSize({ width: newWidth, height: newHeight });
    };
    const handleMouseUp = () => {
      setResizing(false);
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing]);

  React.useEffect(() => {
    if (!dragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = modalRef.current?.getBoundingClientRect();
      const modalWidth = rect?.width || window.innerWidth * 0.9;
      const modalHeight = rect?.height || window.innerHeight * 0.8;
      const maxLeft = window.innerWidth - modalWidth;
      const maxTop = window.innerHeight - modalHeight;
      const newLeft = clamp(
        e.clientX - dragOffset.current.x,
        0,
        maxLeft
      );
      const newTop = clamp(
        e.clientY - dragOffset.current.y,
        0,
        maxTop
      );
      setPosition({ top: newTop, left: newLeft });
    };
    const handleMouseUp = () => {
      setDragging(false);
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);


  const modalContent = (
    <div
      ref={modalRef}
      className="rv-modal-content"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        width: size.width,  
        height: size.height,
        minWidth: 320,
        minHeight: 200,
        maxWidth: '100vw',
        maxHeight: '100vh',
      }}
    >
      <div className="rv-modal-header" onMouseDown={handleMouseDown}>
     
        <span className="rv-modal-title">Redux Visualizer</span>
        <span className="rv-modal-header-spacer" />
        <button className="rv-modal-close" onClick={onClose} title="Fechar">
          X
        </button>
      </div>
      <div className="rv-modal-body">
        <TreeView store={store} />
      </div>
      <div
        className="rv-modal-resize-handle"
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 16,
          height: 16,
          cursor: 'nwse-resize',
          zIndex: 10,
          background: 'transparent',
        }}
        onMouseDown={handleResizeMouseDown}
        title="Redimensionar"
      />
      <div className="rv-modal-resize-handle" />
    </div>
  );

  if (overlay) {
    return (
      <div
        className="rv-modal-overlay"
        style={{
          display: isOpen ? 'flex' : 'none',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        aria-hidden={!isOpen}
      >
        {modalContent}
      </div>
    );
  }
  
  return (
    <div
      style={{
        display: isOpen ? 'block' : 'none',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
      aria-hidden={!isOpen}
    >
      {modalContent}
    </div>
  );
};

export { ReduxVisualizer };
export default ReduxVisualizer;
export type { ReduxVisualizerProps };