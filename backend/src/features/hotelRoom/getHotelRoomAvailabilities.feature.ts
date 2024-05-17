import { Request, Response, Router } from "express";
import { HandleRequest } from "@lib/handleRequest.middleware";
import { AvailabilityRepository } from "@database/availability.repository";

const router = Router();

const availabilityRepository = new AvailabilityRepository();

type AvailabilitiesResponse = {
  id: string;
  date: Date;
  hotelRoomId: string | null;
  bookingId: string | null;
};

router.get(
  "/:hotelRoomId/availabilities",
  HandleRequest(async (req: Request<{ hotelRoomId: string }>, res: Response<AvailabilitiesResponse[]>) => {
    const availabilities = await availabilityRepository.findByHotelRoomId(req.params.hotelRoomId)
    return res.status(200).json(availabilities);
  })
);

export { router as getHotelRoomAvailabilities };