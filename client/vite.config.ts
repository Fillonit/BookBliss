import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
    process.env.NODE_ENV = mode
    process.env.REACT_APP_API_URL =
        mode === 'production'
            ? 'http://localhost:5000'
            : 'https://api.bookbliss.logic-nest.me'
    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    }
})
