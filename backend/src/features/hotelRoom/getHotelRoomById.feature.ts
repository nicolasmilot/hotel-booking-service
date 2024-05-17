import { Request, Response, Router } from "express";
import { Exception, ExceptionResponse, HandleRequest } from "@lib/handleRequest.middleware";
import { HotelRoomRepository } from "@database/hotelRoom.repository";

const router = Router();

const hotelRoomRepository = new HotelRoomRepository();

type HotelRoomResponse = {
  id: string;
  name: string;
  roomNumber: number;
};

class HotelRoomNotFoundException implements Exception {
  readonly statusCode: number = 404;
  readonly name: string = "HOTEL_ROOM_NOT_FOUND";
  readonly message: string = "Hotel Room Not Found";

  constructor(hotelRoomId: string) {
    this.message = `Hotel room not found for id ${hotelRoomId}`
  }
}

router.get(
  "/:hotelRoomId",
  HandleRequest(async (req: Request<{ hotelRoomId: string }>, res: Response<HotelRoomResponse>) => {
    const hotelRoom = await hotelRoomRepository.findById(req.params.hotelRoomId);
    if (!hotelRoom) throw new HotelRoomNotFoundException(req.params.hotelRoomId);
    
    return res.status(200).json(hotelRoom);
  })
);

export { router as getHotelRoomById };