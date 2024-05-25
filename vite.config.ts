import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import dotenv from 'dotenv'

dotenv.config();

export default {
  plugins: [
		wasm()
		// topLevelAwait()
  ],
  define: {
    __MESH_VERT_EXT__: `"${process.env.MESH_VERT_EXT ?? ''}"`,
    __MESH_FRAG_EXT__: `"${process.env.MESH_FRAG_EXT ?? ''}"`
  },
	build: {
    target: 'esnext'
  }
}