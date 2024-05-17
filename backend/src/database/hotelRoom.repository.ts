import { HotelRoom } from "@prisma/client";
import { PrismaClient } from "../prismaClient";

export class HotelRoomRepository {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<HotelRoom[]> {
    return this.prisma.hotelRoom.findMany({
      orderBy: [
        { roomNumber: "asc" }
      ]
    })
  }
  
  async findById(hotelRoomId: string): Promise<HotelRoom | null> {
    return this.prisma.hotelRoom.findFirst({
      where: {
        id: hotelRoomId
      }
    })
  }
}