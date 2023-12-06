import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().min(1),
  NODE_ENV: z.enum(["production", "development"]),
  DATABASE_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(1),
  SESSION_TTL: z.coerce.number().min(1),
  REDIS_URI: z.string().min(1),
});

export const env = envSchema.parse(process.env);
