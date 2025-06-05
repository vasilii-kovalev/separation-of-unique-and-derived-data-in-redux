import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
const config = defineConfig({
	plugins: [
		tsconfigPaths({
			configNames: ["tsconfig.app.json"],
		}),
		react(),
	],
});

export default config;
