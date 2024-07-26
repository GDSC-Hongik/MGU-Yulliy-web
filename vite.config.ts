import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src'), // src를 프로젝트의 실제 소스 코드 루트로 설정합니다.
		},
	},
});
