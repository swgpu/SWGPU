import wasm from 'vite-plugin-wasm';
import FullReload from 'vite-plugin-full-reload';
import path from 'path';

export default {
  plugins: [
    FullReload(['public/**'])
  ],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, './src/lib')
    }
  },
	build: {
    target: 'esnext',
    rollupOptions: {
      treeshake: false,
    }
  }  
}