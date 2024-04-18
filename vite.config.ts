import wasm from 'vite-plugin-wasm';
import PreprocessorDirectives from 'unplugin-preprocessor-directives/vite'
import topLevelAwait from 'vite-plugin-top-level-await';

export default {
  plugins: [
		wasm(),
    PreprocessorDirectives({ /* options */ })
		// topLevelAwait()
  ],
	build: {
    target: 'esnext'
  }
}