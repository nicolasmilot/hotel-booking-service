import express from "express";
import { getHotelRooms } from "@features/hotelRoom/getHotelRooms.feature";
import { getHotelRoomById } from "@features/hotelRoom/getHotelRoomById.feature";
import * as process from "process";
import { getHotelRoomAvailabilities } from "@features/hotelRoom/getHotelRoomAvailabilities.feature";

if (
  !process.env.APP_POSTGRES_URL
) {
    console.log("Missing database credentials");
    process.exit();
}

if (process.env.NODE_ENV !== "test") {
    process.env.POSTGRES_URL = process.env.APP_POSTGRES_URL;
} else {
    process.env.POSTGRES_URL = process.env.TEST_POSTGRES_URL;
}

const app = express();

app.use(express.json());

app.use("/api/v1/hotel-rooms", getHotelRooms);
app.use("/api/v1/hotel-rooms", getHotelRoomById);
app.use("/api/v1/hotel-rooms", getHotelRoomAvailabilities);

app.get("/", (req, res) => {
    res.send("Hello, how are you today ?");
});

export { app };
