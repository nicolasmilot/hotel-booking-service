import * as process from "process";
import { PrismaClient as Prisma } from "@prisma/client";

export class PrismaClient extends Prisma {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.NODE_ENV !== "test" ? process.env.APP_POSTGRES_URL : process.env.TEST_POSTGRES_URL,
        },
      }
    });
  }
}
