import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReduxVisualizer',
      fileName: (format) => `redux-visualizer.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'redux', 'react-redux'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          redux: 'Redux',
          'react-redux': 'ReactRedux',
        },
      },
    },
  },
});
