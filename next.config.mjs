/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [{
        source: '/',
        destination: '/auth/login',
        permanent: true,
      }, ]
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
        // {
        //   protocol: "http",
        //   hostname: "res.cloudinary.com",
        // },
      ],
    },
    // async rewrites() {
    //   return [
    //     {
    //       source: `/api/:path*`,
    //       destination: `/api/:path*`,
    //     },
    //     {
    //       "source": "/api/auth/:path*",
    //       "destination": "/routes/auth/:path*" //change "routes" to your liking
    //     },
    //   ];
    // },
};

export default nextConfig;
