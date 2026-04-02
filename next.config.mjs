/** @type {import('next').NextConfig} */
const nextConfig = {
async rewrites() {
return [
{
source: "/backend/:path*",
destination: "http://127.0.0.1:8000/api/:path*",
},
];
},

images: {
domains: ["127.0.0.1"],
},
};

export default nextConfig;
