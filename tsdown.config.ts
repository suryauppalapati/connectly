import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/server.ts"],
  unbundle: true,
  outDir: "dist",
  format: "es"
});