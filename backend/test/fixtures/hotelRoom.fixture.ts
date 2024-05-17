import { HotelRoom } from "@prisma/client";
import { v4 as uuid } from "uuid";

export const createHotelRoom = (props?: Partial<HotelRoom>): HotelRoom => {
  return {
    id: uuid(),
    name: "Hotel Room name",
    roomNumber: 101,
    ...props
  }
};