import { Router, Response } from "express";
import { HotelRoomRepository } from "@database/hotelRoom.repository";

const router = Router();

const hotelRoomRepository = new HotelRoomRepository();

type HotelRoomResponse = {
  id: string;
  name: string;
  roomNumber: number;
};

router.get("/", async (_req, res: Response<HotelRoomResponse[]>) => {
  const hotelRooms = await hotelRoomRepository.findAll();

  return res.status(200).json(hotelRooms);
});

export { router as getHotelRooms };