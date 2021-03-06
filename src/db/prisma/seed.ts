import { Prisma, PrismaClient } from "@prisma/client";
import cuid from "cuid";
import { faker } from "@faker-js/faker";
import { randomNumberBetween } from "../../common/utils";

const prisma = new PrismaClient();

async function main() {
  console.log(`Trancate all tables ...`);
  await prisma.$queryRaw`TRUNCATE TABLE categories;`;
  await prisma.$queryRaw`TRUNCATE TABLE categories_on_products;`;
  await prisma.$queryRaw`TRUNCATE TABLE products;`;
  await prisma.$queryRaw`TRUNCATE TABLE inventory_items;`;
  await prisma.$queryRaw`TRUNCATE TABLE cart_items;`;
  await prisma.$queryRaw`TRUNCATE TABLE orders;`;

  console.log(`Start seeding ...`);
  const categoryData: Prisma.CategoryCreateManyInput[] = [
    {
      id: cuid(),
      name: "Đồ ăn vặt",
    },
    {
      id: cuid(),
      name: "Đồ uống",
    },
    {
      id: cuid(),
      name: "Đồ ăn OT",
    },
    {
      id: cuid(),
      name: "Kem",
    },
    {
      id: cuid(),
      name: "Category 1",
    },
    {
      id: cuid(),
      name: "Category 2",
    },
    {
      id: cuid(),
      name: "Category 3",
    },
    {
      id: cuid(),
      name: "Category 4",
    },

    {
      id: cuid(),
      name: "Category 5",
    },
  ];
  const productData: Prisma.ProductCreateManyInput[] = [];
  const categoriesOnProductsData: Prisma.CategoriesOnProductsCreateManyInput[] =
    [];
  const productVariantData: Prisma.ProductVariantCreateManyInput[] = [];
  const imageData: Prisma.ProductImageCreateManyInput[] = [];
  const inventoryItemData: Prisma.InventoryItemCreateManyInput[] = [];

  const categoryIds = categoryData.map((item) => item.id || cuid());

  for (let i = 1; i <= 5000; i++) {
    const productId = cuid();

    const randomCategoryId =
      categoryIds[Math.floor(Math.random() * categoryIds.length)];

    categoriesOnProductsData.push({
      productId: productId,
      categoryId: randomCategoryId,
      assignedBy: "seed",
    });

    for (let j = 1; j <= randomNumberBetween(1, 6); j++) {
      imageData.push({
        id: cuid(),
        source: faker.image.food(280, 280, true),
        position: j,
      });
    }

    productData.push({
      id: productId,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      labelPrice: Number(faker.commerce.price(10, 20)) * 1000,
    });

    const imagesIds = imageData.map((item) => item.id || cuid());
    const randomImageId =
      imagesIds[Math.floor(Math.random() * imagesIds.length)];

    const variantId = cuid();
    productVariantData.push({
      id: variantId,
      productId: productId,
      imageId: randomImageId,
      price: Number(faker.commerce.price(10, 20)) * 1000,
      title: faker.commerce.productAdjective(),
    });

    for (let m = 1; m <= randomNumberBetween(2, 5); m++) {
      inventoryItemData.push({
        productVariantId: variantId,
      });
    }
  }
  await prisma.$transaction([
    prisma.category.createMany({ data: categoryData, skipDuplicates: true }),
    prisma.categoriesOnProducts.createMany({
      data: categoriesOnProductsData,
      skipDuplicates: true,
    }),
    prisma.product.createMany({ data: productData, skipDuplicates: true }),
    prisma.productVariant.createMany({
      data: productVariantData,
      skipDuplicates: true,
    }),
    prisma.productImage.createMany({ data: imageData, skipDuplicates: true }),
    prisma.inventoryItem.createMany({
      data: inventoryItemData,
      skipDuplicates: true,
    }),
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
