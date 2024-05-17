import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process"
import * as process from "process";

let prisma;

beforeAll(async () => {
  const testDatabaseUrl = process.env.TEST_POSTGRES_URL;
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: testDatabaseUrl,
      },
    },
  });

  try {

    // console.log("WARNING, migrations will be reset");
    execSync(`POSTGRES_URL=${testDatabaseUrl} npx prisma migrate reset --force --skip-seed`);
    // console.log("All migrations have been rolled back by resetting the database.");
  } catch (error) {
    console.error("Failed to rollback migrations: ", error);
  }

  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
});

afterEach(async () => {
  await prisma.booking.deleteMany({ where: {} });
  await prisma.availability.deleteMany({ where: {} });
  await prisma.hotelRoom.deleteMany({ where: {} });
});