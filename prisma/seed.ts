import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashingRounds = 10;

  // clear all old data
  await prisma.booking.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.upsert({
    create: {
      email: 'daniloDummy@yahoo.com',
      password: await bcrypt.hash('beatiful-password', hashingRounds),
    },
    where: {
      email: 'daniloDummy@yahoo.com',
    },
    update: {},
  });

  const user2 = await prisma.user.upsert({
    create: {
      email: 'user2@garbaioemail.com',
      password: await bcrypt.hash('baka-password', hashingRounds),
    },
    where: {
      email: 'user2@garbaioemail.com',
    },
    update: {},
  });

  await prisma.booking.upsert({
    create: {
      userId: user1.id,
      date: new Date(),
    },
    where: {
      id: user1.id, // Assuming you have a unique id for the booking
    },
    update: {},
  });

  await prisma.booking.upsert({
    create: {
      userId: user2.id,
      date: new Date(),
    },
    where: {
      id: user2.id, // Assuming you have a unique id for the booking
    },
    update: {},
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
