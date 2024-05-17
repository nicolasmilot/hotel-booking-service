import request from "supertest"
import { app } from "../../src/app"
import { HotelRoom } from "@prisma/client";
import { PrismaClient } from "../../src/prismaClient";
import { createHotelRoom } from "../fixtures/hotelRoom.fixture";

let prisma = new PrismaClient();

describe("Get hotel room feature tests", () => {
  const givenTheHotelRooms = async (hotelRooms: HotelRoom[]) => {
    return prisma.hotelRoom.createMany({
      data: hotelRooms
    });
  };

  it("should return a 200 status code with every hotel rooms sorted by room number when there are hotel rooms", async () => {
    const hotelRoom1 = createHotelRoom({
      roomNumber: 1
    });
    const hotelRoom2 = createHotelRoom({
      roomNumber: 2
    });
    const hotelRoom3 = createHotelRoom({
      roomNumber: 3
    });
    await givenTheHotelRooms([hotelRoom1, hotelRoom2, hotelRoom3]);

    const response = await request(app)
      .get("/api/v1/hotel-rooms")

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([
      hotelRoom1,
      hotelRoom2,
      hotelRoom3
    ]);
  });

  it("should return a 200 status code with an empty list when there are no hotel rooms", async () => {
    await givenTheHotelRooms([]);

    const response = await request(app).get('/api/v1/hotel-rooms');

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject([]);
  });
});
