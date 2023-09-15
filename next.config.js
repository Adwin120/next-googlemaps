/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com",
            },
        ],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        config.module.rules.push({
            test: /\.sql/i,
            use: 'raw-loader'
        })
        config.resolve.extensions.push('.sql')
        return config;
    },
};

module.exports = nextConfig;
