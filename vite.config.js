import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': '/src', // Відносний шлях до src
		},
	},
})

// ! ===================================================
// import { fileURLToPath } from 'node:url'
// import { dirname, resolve } from 'node:path'
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import tailwindcss from '@tailwindcss/vite'

// // Отримуємо абсолютний шлях до поточної директорії
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// export default defineConfig({
// 	plugins: [react(), tailwindcss()],
// 	resolve: {
// 		alias: {
// 			'@': resolve(__dirname, './src'),
// 		},
// 	},
// })
