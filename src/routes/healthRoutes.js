import express from 'express';
import prisma from '../config/db/prismaClient.js'
import redisClient from '../config/cache/redisClient.js'

const router = express.Router();

router.get("/", async(req,res) =>{
    const status = {
    server: "up",
    database: "unknown",
    redis: "unknown",
    };

    try {
        await prisma.$queryRaw`SELECT 1`;
        status.database ="up"
    } catch (error) {
        status.database="down"
        console.log(`DATABASE ERROR: `, error)
    }

    try {
        await redisClient.ping();
        status.redis ="up"
    } catch (error) {
        status.redis ="down"
        console.log("REDIS ERROR: " ,error)
    }
      const health = {
    success: true,
    statusCode: 200,
    message: "health check successfully",
    timestamp: new Date().toISOString(),
    uptime: process.uptime().toFixed(0) + "s",
    environment: process.env.NODE_ENV || "development",
    services: status,
  };

  // 🟢 Kalau semua “up” = OK, kalau ada yg “down” = partial
  const isHealthy = Object.values(status).every((s) => s === "up");
  const code = isHealthy ? 200 : 503;

  res.status(code).json(health)

})

export default router