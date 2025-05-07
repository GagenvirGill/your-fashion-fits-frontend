import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	worker: {
		format: "es",
		plugins: [
			{
				name: "no-strict-in-workers",
				renderChunk(code) {
					return code.replace('"use strict";', "");
				},
			},
		],
	},
});
