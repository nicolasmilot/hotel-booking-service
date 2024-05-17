import { HotelRoom, Availability } from "@prisma/client";
import { PrismaClient } from "../../src/prismaClient";
import { createHotelRoom } from "../fixtures/hotelRoom.fixture";
import { createAvailability } from "../fixtures/availability.fixture";
import request from "supertest";
import { app } from "../../src/app"

let prisma = new PrismaClient();

describe("Get hotel room by id feature tests", () => {
  const givenTheAvailabilitiesForAnHotelRoom = async (availabilities: Availability[]) => {
    return prisma.availability.createMany({
      data: availabilities
    })
  }
  const givenTheHotelRooms = async (hotelRooms: HotelRoom[]) => {
    return prisma.hotelRoom.createMany({
      data: hotelRooms
    });
  };

  it("should return a 200 status code and a list of bookings sorted by date when an hotel room matches the id and has bookings", async () => {
    await givenTheHotelRooms([
      createHotelRoom({ id: "97f7f91a-44c1-45e9-aead-0278edcc16e6" }),
      createHotelRoom({ id: "d18e050d-ee8c-44bf-b9bc-5868fdd7a515" })
    ]);

    await givenTheAvailabilitiesForAnHotelRoom([
      createAvailability({ hotelRoomId: "d18e050d-ee8c-44bf-b9bc-5868fdd7a515" }),
      createAvailability({ hotelRoomId: "d18e050d-ee8c-44bf-b9bc-5868fdd7a515" }),
      createAvailability({ hotelRoomId: "d18e050d-ee8c-44bf-b9bc-5868fdd7a515" }),
      {
        id: "c0bafee9-eeb6-4ece-8b1b-8d8643985db0",
        date: new Date(2024, 7, 1),
        hotelRoomId: "97f7f91a-44c1-45e9-aead-0278edcc16e6",
        bookingId : null,
      },
      {
        id: "8ab1db7e-84e7-4e15-beea-58c404445db6",
        date: new Date(2024, 7, 2),
        hotelRoomId: "97f7f91a-44c1-45e9-aead-0278edcc16e6",
        bookingId: null,
      },
      {
        id: "26e9ecb2-804b-42cd-9d56-3c55c63791f2",
        date: new Date(2024, 7, 3),
        hotelRoomId: "97f7f91a-44c1-45e9-aead-0278edcc16e6",
        bookingId: null,
      },
    ]);

    const response = await request(app)
      .get("/api/v1/hotel-rooms/97f7f91a-44c1-45e9-aead-0278edcc16e6/availabilities");

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject([
      {
        id: "c0bafee9-eeb6-4ece-8b1b-8d8643985db0",
        date: "2024-08-01T00:00:00.000Z",
        hotelRoomId: "97f7f91a-44c1-45e9-aead-0278edcc16e6",
        bookingId : null,
      },
      {
        id: "8ab1db7e-84e7-4e15-beea-58c404445db6",
        date: "2024-08-02T00:00:00.000Z",
        hotelRoomId: "97f7f91a-44c1-45e9-aead-0278edcc16e6",
        bookingId: null,
      },
      {
        id: "26e9ecb2-804b-42cd-9d56-3c55c63791f2",
        date: "2024-08-03T00:00:00.000Z",
        hotelRoomId: "97f7f91a-44c1-45e9-aead-0278edcc16e6",
        bookingId: null,
      },
    ]);
  });

  it("should return a 200 status code with an empty list when the hotel room that matches the id has no booking", async () => {
    await givenTheHotelRooms([
      createHotelRoom({ id: "97f7f91a-44c1-45e9-aead-0278edcc16e6" }),
      createHotelRoom({ id: "d18e050d-ee8c-44bf-b9bc-5868fdd7a515" })
    ]);
    await givenTheAvailabilitiesForAnHotelRoom([
      createAvailability({ hotelRoomId: "d18e050d-ee8c-44bf-b9bc-5868fdd7a515" }),
      createAvailability({ hotelRoomId: "d18e050d-ee8c-44bf-b9bc-5868fdd7a515" }),
      createAvailability({ hotelRoomId: "d18e050d-ee8c-44bf-b9bc-5868fdd7a515" }),
    ]);

    const response = await request(app)
      .get("/api/v1/hotel-rooms/97f7f91a-44c1-45e9-aead-0278edcc16e6/availabilities");

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject([]);
  })

  it("should return a 200 status code with an empty list when no hotel room matches the id", async () => {
    await givenTheHotelRooms([
      createHotelRoom({ id: "97f7f91a-44c1-45e9-aead-0278edcc16e6" }),
    ]);
    await givenTheAvailabilitiesForAnHotelRoom([
      createAvailability({ hotelRoomId: "97f7f91a-44c1-45e9-aead-0278edcc16e6" }),
      createAvailability({ hotelRoomId: "97f7f91a-44c1-45e9-aead-0278edcc16e6" }),
      createAvailability({ hotelRoomId: "97f7f91a-44c1-45e9-aead-0278edcc16e6" }),
    ]);

    const response = await request(app)
      .get("/api/v1/hotel-rooms/d18e050d-ee8c-44bf-b9bc-5868fdd7a515/availabilities");

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject([]);
  });
});
