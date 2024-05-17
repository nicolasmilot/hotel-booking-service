import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

async function main() {
  let roomNumberIncrement = 1;
  return Promise.all([...Array(30)].map(i => {
    const hotelRoom = prisma.hotelRoom.create({
      data: {
        id: uuid(),
        name: faker.commerce.productName(),
        roomNumber: roomNumberIncrement + 100
      },
    });

    roomNumberIncrement++;

    return hotelRoom;
  }));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });