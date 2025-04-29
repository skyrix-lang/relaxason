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
			filename: 'dist/stats.html',
			open: false,
		})
	],
	// Optimisation CSS uniquement - pas de suppressions agressives
	css: {
		devSourcemap: false
	},
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		},
		rollupOptions: {
			output: {
				// Chunking plus standard sans optimisation excessive
				manualChunks: {
					'vendor': ['react', 'react-dom', 'react-router-dom'],
					'mantine': ['@mantine/core', '@mantine/hooks']
				}
			}
		}
	}
});
