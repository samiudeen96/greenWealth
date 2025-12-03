// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
    images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "3.108.63.117",
        port: "9000",
        pathname: "/static/**",
      },
    ],
  },
};

export default nextConfig;
