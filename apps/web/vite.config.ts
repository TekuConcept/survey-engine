import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
        "@": path.resolve(__dirname, "src"),
        "@app": path.resolve(__dirname, "src/app"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@features": path.resolve(__dirname, "src/features"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@routes": path.resolve(__dirname, "src/routes"),
        "@shared": path.resolve(__dirname, "src/shared"),
        "@public": path.resolve(__dirname, "public"),
        },
    },
    server: {
        port: 3000
    }
})
