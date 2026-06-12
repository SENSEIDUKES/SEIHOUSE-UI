import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workbenchDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(workbenchDir, "../.."),
  transpilePackages: ["@seihouse/ui"],
};

export default nextConfig;