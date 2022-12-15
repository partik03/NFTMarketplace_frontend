/** @type {import('next').NextConfig} */
require("dotenv").config("dotenv")
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['hindustantimes.com','gstatic.com']
  },
  env:{
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_SECRET_API_KEY: process.env.PINATA_SECRET_API_KEY
  }
}

module.exports = nextConfig
