import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://192.168.115.129:3000",
                      " http://172.18.0.2:3000" ],
};

export default nextConfig;
