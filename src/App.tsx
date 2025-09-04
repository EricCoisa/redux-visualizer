import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import reactLogo from './assets/react.svg'
import viteLogo from '/redux-visualizer.svg'
import './App.css'
import ReduxVisualizer from './components/reduxVisualizer/reduxVisualizer'


function App() {
  const [r, setR] = useState(false);
  const count = useSelector((state: any) => state.counter.value ?? state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch({ type: 'counter/increment' })}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={() => setR((r) => !r)} style={{ position: 'fixed', bottom: 20, right: 20, padding: '10px 20px', backgroundColor: '#61dafb', border: 'none', borderRadius: 5, cursor: 'pointer' }}>
        Toggle Redux Visualizer
      </button>
      <ReduxVisualizer isOpen={r} onClose={() => setR(false)} />
    </>
  );
}

export default App
