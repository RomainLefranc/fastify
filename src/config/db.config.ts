import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log("Connected to Database");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
