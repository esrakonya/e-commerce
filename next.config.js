/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
            },
        ],
    }
}

module.exports = nextConfig
