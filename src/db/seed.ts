import { Prisma, PrismaClient, Product } from "@prisma/client";
import cuid from "cuid";
import { faker } from "@faker-js/faker";
import { randomNumberBetween } from "../common/utils";

const prisma = new PrismaClient();

async function main() {
  console.log(`Trancate all tables ...`);
  await prisma.$queryRaw`TRUNCATE TABLE products;`;
  await prisma.$queryRaw`TRUNCATE TABLE inventory_items;`;
  await prisma.$queryRaw`TRUNCATE TABLE orders;`;

  console.log(`Start seeding ...`);

  const productData: Prisma.ProductCreateManyInput[] = [];
  const productVariantData: Prisma.ProductVariantCreateManyInput[] = [];
  const imageData: Prisma.ProductImageCreateManyInput[] = [];

  for (let i = 1; i <= 1000; i++) {
    const productId = cuid();

    for (let j = 1; j <= randomNumberBetween(4, 6); j++) {
      imageData.push({
        productId: productId,
        source: faker.image.food(),
        position: j,
      });
    }

    productData.push({
      id: productId,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      labelPrice: Number(faker.commerce.price(10, 20)),
    });

    productVariantData.push({
      productId: productId,
      price: Number(faker.commerce.price(10, 20)),
      title: faker.commerce.productAdjective(),
    });
  }
  await prisma.$transaction([
    prisma.product.createMany({ data: productData, skipDuplicates: true }),
    prisma.productVariant.createMany({
      data: productVariantData,
      skipDuplicates: true,
    }),
    prisma.productImage.createMany({ data: imageData, skipDuplicates: true }),
  ]);
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
