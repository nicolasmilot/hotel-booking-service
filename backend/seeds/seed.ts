import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  return Promise.all([...Array(25)].map(i => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return prisma.user.create({
      data: {
        id: i,
        email: faker.internet.email({ firstName, lastName }),
        firstName,
        lastName,
        avatarUrl: "https://picsum.photos/200/300",
      },
    });
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

  })