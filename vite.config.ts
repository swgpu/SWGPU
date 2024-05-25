import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

const MESH_VERT_EXT = `
// put your extension code here.
`;

const MESH_FRAG_EXT = `
// put your extension code here.
`;

export default {
  plugins: [
		wasm()
		// topLevelAwait()
  ],
  define: {
    __MESH_VERT_EXT__: JSON.stringify(MESH_VERT_EXT),
    __MESH_FRAG_EXT__: JSON.stringify(MESH_FRAG_EXT)
  },
	build: {
    target: 'esnext'
  }
}