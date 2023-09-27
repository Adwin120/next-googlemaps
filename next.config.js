/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com",
            },
            {
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        config.module.rules.push({
            test: /\.sql/i,
            use: "raw-loader",
        });
        config.resolve.extensions.push(".sql");
        return config;
    },
    experimental: {
        serverActions: true,
        optimizePackageImports: ["react-icons"]
    },
};

module.exports = nextConfig;
