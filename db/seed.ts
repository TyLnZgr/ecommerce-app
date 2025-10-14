import { PrismaClient } from "@/lib/generated/prisma";
import dummyData from "./dummy-data";
import { hash } from "@/lib/encrypt";

async function main() {
  const prisma = new PrismaClient();

  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: dummyData.products });
  const users = [];
  for (let i = 0; i < dummyData.users.length; i++) {
    users.push({
      ...dummyData.users[i],
      password: await hash(dummyData.users[i].password),
    });
  }
  await prisma.user.createMany({ data: users });
  console.log("seeded successfully!..");
}

main();
