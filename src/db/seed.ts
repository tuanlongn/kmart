import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
  {
    name: "Kem ly merino - SOCOLA CHUỐI",
    description:
      "Kem ly Merino có thể thỏa mãn mọi khẩu vị với các hương vị từ cốm sữa, sữa dừa ngọt ngào, vani dâu, vani socola hay socola chuối độc đáo đến các hương vị kem ly truyền thống như kem đậu xanh, đậu đỏ, khoai môn, sầu riêng hay đặc biệt hơn là kem ly dành riêng cho mùa đông với hương quế và gừng vừa ấm áp vừa quen thuộc với khẩu vị người Việt Nam.",
  },
  {
    name: "Kem ly merino - CỐM SỮA",
    description:
      "Kem ly Merino có thể thỏa mãn mọi khẩu vị với các hương vị từ cốm sữa, sữa dừa ngọt ngào, vani dâu, vani socola hay socola chuối độc đáo đến các hương vị kem ly truyền thống như kem đậu xanh, đậu đỏ, khoai môn, sầu riêng hay đặc biệt hơn là kem ly dành riêng cho mùa đông với hương quế và gừng vừa ấm áp vừa quen thuộc với khẩu vị người Việt Nam.",
  },
  {
    name: "Kem ly merino - VANI SOCOLA",
    description:
      "Kem ly Merino có thể thỏa mãn mọi khẩu vị với các hương vị từ cốm sữa, sữa dừa ngọt ngào, vani dâu, vani socola hay socola chuối độc đáo đến các hương vị kem ly truyền thống như kem đậu xanh, đậu đỏ, khoai môn, sầu riêng hay đặc biệt hơn là kem ly dành riêng cho mùa đông với hương quế và gừng vừa ấm áp vừa quen thuộc với khẩu vị người Việt Nam.",
  },
  {
    name: "Kem ly merino - SỮA DỪA",
    description:
      "Kem ly Merino có thể thỏa mãn mọi khẩu vị với các hương vị từ cốm sữa, sữa dừa ngọt ngào, vani dâu, vani socola hay socola chuối độc đáo đến các hương vị kem ly truyền thống như kem đậu xanh, đậu đỏ, khoai môn, sầu riêng hay đặc biệt hơn là kem ly dành riêng cho mùa đông với hương quế và gừng vừa ấm áp vừa quen thuộc với khẩu vị người Việt Nam.",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created user with id: ${product.id}`);
  }
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
