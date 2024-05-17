import request from "supertest"
import { app } from "../../src/app"
import { HotelRoom } from "@prisma/client";
import { PrismaClient } from "../../src/prismaClient";
import { createHotelRoom } from "../fixtures/hotelRoom.fixture";

let prisma = new PrismaClient();

describe("Get hotel room by id feature tests", () => {
  const givenTheHotelRooms = async (hotelRooms: HotelRoom[]) => {
    return prisma.hotelRoom.createMany({
      data: hotelRooms
    });
  };

  it("should return a 200 status code with the hotel room that matches the id", async () => {
    const hotelRoom1 = createHotelRoom({
      id: "d4b510f4-9f0d-4f88-aa2d-dccada1fde7e",
      name: "The First Hotel Room",
      roomNumber: 1
    });
    const hotelRoom2 = createHotelRoom({
      id: "902d71d5-a5bb-4efd-9c79-353367886376",
    });
    await givenTheHotelRooms([hotelRoom1, hotelRoom2]);

    const response = await request(app)
      .get("/api/v1/hotel-rooms/d4b510f4-9f0d-4f88-aa2d-dccada1fde7e")

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: "d4b510f4-9f0d-4f88-aa2d-dccada1fde7e",
      name: "The First Hotel Room",
      roomNumber: 1
    });
  });

  it("should return a 404 error code when there is no hotel room that matches the id", async () => {
    const hotelRoom1 = createHotelRoom({
      id: "d4b510f4-9f0d-4f88-aa2d-dccada1fde7e",
    });
    const hotelRoom2 = createHotelRoom({
      id: "902d71d5-a5bb-4efd-9c79-353367886376",
    });
    await givenTheHotelRooms([hotelRoom1, hotelRoom2]);

    const response = await request(app)
      .get("/api/v1/hotel-rooms/3a1a4362-17d7-49c1-bb6c-7600b46aa7f0");

    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({
      errorCode: "HOTEL_ROOM_NOT_FOUND",
      message: "Hotel room not found for id 3a1a4362-17d7-49c1-bb6c-7600b46aa7f0"
    });
  });
});
