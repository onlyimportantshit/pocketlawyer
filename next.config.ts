import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 'export' is required for Capacitor. 
     It generates a static 'out' folder instead of a Node.js server.
  */
  output: 'export',
  
  /* Since iOS handles images differently, we disable the 
     Next.js Image Optimization API for the static build.
  */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;