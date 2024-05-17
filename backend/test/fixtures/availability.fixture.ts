import { Availability } from "@prisma/client";
import { v4 as uuid } from "uuid";

export const createAvailability = (props?: Partial<Availability>): Availability => {
  return {
    id: uuid(),
    date: new Date(),
    hotelRoomId: null,
    bookingId: null,
    ...props
  }
};