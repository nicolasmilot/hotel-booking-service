import { Availability } from "@prisma/client";
import { PrismaClient } from "../prismaClient";

export class AvailabilityRepository {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findByHotelRoomId(hotelRoomId: string): Promise<Availability[]> {
    return this.prisma.availability.findMany({
      where: { hotelRoomId },
      orderBy: [
        { date: "asc" }
      ]
    })
  }
}
