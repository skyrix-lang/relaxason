import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import viteCompression from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

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
		})
	],
	build: {
		// Additional build optimizations
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		},
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom'],
					mantine: ['@mantine/core', '@mantine/hooks']
				}
			}
		}
	}
});
