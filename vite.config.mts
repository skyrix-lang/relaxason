// vite.config.mts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		viteCompression({
			verbose: true,
			algorithm: 'gzip',
			ext: '.gz',
			threshold: 10240,
			deleteOriginFile: false
		}),
		ViteImageOptimizer({
			png: {
				quality: 80
			},
			jpeg: {
				quality: 80
			},
			jpg: {
				quality: 80
			},
			webp: {
				lossless: true
			}
		}),
		visualizer({
			filename: 'stats.html',
			open: false,
		})
	],
	// Point to the new MTS config
	css: {
		postcss: './postcss.config.mts',
	},
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
				pure_funcs: ['console.log', 'console.info', 'console.debug']
			}
		},
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
					mantine: ['@mantine/core', '@mantine/hooks'],
					icons: ['@tabler/icons-react']
				}
			},
			treeshake: {
				moduleSideEffects: false,
				propertyReadSideEffects: false,
				tryCatchDeoptimization: false
			}
		},
		target: 'es2020'
	}
});
