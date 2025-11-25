/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Essential for static sites
  // Only add basePath if deploying to a subdirectory (like GitHub Pages)
  // basePath: '/your-repo-name', 
  images: {
    unoptimized: true, // Required for static export if using <Image />
  },
};

export default nextConfig;
