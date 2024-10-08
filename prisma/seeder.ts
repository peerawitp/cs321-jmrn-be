import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed data for Product
  const product1 = await prisma.product.create({
    data: {
      name: "Scooter Tire Model X",
      description: "High-performance tire for scooters",
      imageUrl:
        "https://www.irctirethailand.com/wp-content/uploads/2021/01/MB48-405x330.jpg",
      patternAndType: "SS-560R T/L",
      wheel: "FRONT", // Assuming WheelType enum includes values like FRONT, REAR, BOTH
      type: "SCOOTER", // Assuming TireType enum includes values like Scooter, OnRoad-Automatic

      productSizes: {
        create: [
          {
            name: "90/90-14 M/C 46P",
            overallDiameter: 535,
            overallWidth: 98,
            measurementRim: "MT 2.15",
            standardRim: "MT 2.50",
            price: 50.99,
            quantity: 100,
          },
          {
            name: "100/80-14 M/C 48P",
            overallDiameter: 545,
            overallWidth: 105,
            measurementRim: "MT 2.50",
            standardRim: "MT 2.75",
            price: 60.99,
            quantity: 80,
          },
        ],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "OnRoad Automatic Tire Z",
      description: "Durable tire for on-road automatic vehicles",
      imageUrl:
        "https://www.irctirethailand.com/wp-content/uploads/2021/01/NR50-405x330.jpg",
      patternAndType: "SS-660Z R/L",
      wheel: "REAR",
      type: "ONROAD_AUTOMATIC",

      productSizes: {
        create: [
          {
            name: "110/90-16 M/C 59S",
            overallDiameter: 600,
            overallWidth: 110,
            measurementRim: "MT 3.00",
            standardRim: "MT 3.25",
            price: 75.5,
            quantity: 50,
          },
        ],
      },
    },
  });

  console.log({ product1, product2 });
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
