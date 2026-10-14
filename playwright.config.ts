import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  use: { baseURL: "http://127.0.0.1:3000", ...devices["Desktop Chrome"], contextOptions: { reducedMotion: "reduce" } },
  webServer: { command: "npm start -- --hostname 127.0.0.1", url: "http://127.0.0.1:3000/api/health", reuseExistingServer: !process.env.CI },
});
