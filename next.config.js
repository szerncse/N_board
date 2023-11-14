/** @type {import('next').NextConfig} */
const nextConfig = {
    env : {
        NEXT_PUBLIC_DATABASE_HOST : process.env.NEXT_PUBLIC_DATABASE_HOST,
        NEXT_PUBLIC_DATABASE_USENAME : process.env.NEXT_PUBLIC_DATABASE_USENAME,
        NEXT_PUBLIC_DATABASE_PASSWORD : process.env.NEXT_PUBLIC_DATABASE_PASSWORD,
        NEXT_PUBLIC_DATABASE_NAME : process.env.NEXT_PUBLIC_DATABASE_NAME
    }
}

module.exports = nextConfig
