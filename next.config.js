/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We need to allow for WebGL context to be available on Vercel preview environments
  // This is generally a client-side thing, but good practice for Three.js
}

module.exports = nextConfig
