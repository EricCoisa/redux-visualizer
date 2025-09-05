import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      insertTypesEntry: true,
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReduxVisualizer',
      fileName: (format) => `redux-visualizer.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'redux', 'react-redux', '@reduxjs/toolkit'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          redux: 'Redux',
          'react-redux': 'ReactRedux',
          '@reduxjs/toolkit': 'RTK',
        },
        exports: 'named',
      },
    },
  },
});
