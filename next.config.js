/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
    NEXTAUTH_SECRET:"supersecret",
    },
    images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'a0.muscache.com'
    ]
  } 
}

module.exports = nextConfig
