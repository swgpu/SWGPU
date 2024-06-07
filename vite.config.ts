import wasm from 'vite-plugin-wasm';
import path from 'path';

export default {
  plugins: [
		wasm()
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