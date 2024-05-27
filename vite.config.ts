import wasm from 'vite-plugin-wasm';
import path from 'path';
import topLevelAwait from 'vite-plugin-top-level-await';

const MESH_VERT_EXT = ``;
const MESH_FRAG_EXT = ``;
const PPE_VERT_EXT = ``;
const PPE_FRAG_EXT = ``;

export default {
  plugins: [
		wasm()
		// topLevelAwait()
  ],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, './src/lib')
    }
  },
  define: {
    __MESH_VERT_EXT__: JSON.stringify(MESH_VERT_EXT),
    __MESH_FRAG_EXT__: JSON.stringify(MESH_FRAG_EXT),
    __PPE_VERT_EXT__: JSON.stringify(PPE_VERT_EXT),
    __PPE_FRAG_EXT__: JSON.stringify(PPE_FRAG_EXT)
  },
	build: {
    target: 'esnext'
  }
}