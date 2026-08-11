/*
ADD to package.json devDependencies:
  "@testing-library/jest-dom": "^6.4.6",
  "@testing-library/react": "^16.0.0",
  "@testing-library/user-event": "^14.5.2",
  "@vitest/coverage-v8": "^2.0.5",
  "jsdom": "^24.1.1",
  "vitest": "^2.0.5"

ADD to package.json scripts:
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"

INSTALL:
  npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event @vitest/coverage-v8 jsdom vitest

UPDATE vite.config.js to include the test block below:
*/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.js",
    css: true,
  },
});
