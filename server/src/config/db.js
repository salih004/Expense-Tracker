const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create Prisma adapter with pg pool
const adapter = new PrismaPg(pool);

// Create Prisma client with the adapter
const prisma = new PrismaClient({ adapter });

const testConnection = async (callback) => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    if (callback) callback(true);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    if (callback) callback(false);
  }
};

module.exports = { prisma, pool, testConnection };
