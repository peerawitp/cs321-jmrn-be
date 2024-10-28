import { PrismaClient } from "@prisma/client";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(import.meta.dir, "seeders/tires.json");
  const fileContent = await Bun.file(filePath).json();
  const tireData = fileContent;

  for (const tireType of tireData) {
    for (const tire of tireType.tires) {
      const hasFront = tire.sizes.some(
        (size: any) => size.wheel_position === "หน้า",
      );
      const hasRear = tire.sizes.some(
        (size: any) => size.wheel_position === "หลัง",
      );
      let wheelType: "FRONT" | "REAR" | "BOTH" = "BOTH";

      if (hasFront && !hasRear) {
        wheelType = "FRONT";
      } else if (hasRear && !hasFront) {
        wheelType = "REAR";
      }

      const product = await prisma.product.create({
        data: {
          name: tire.name,
          description: tire.description,
          imageUrl: tire.image,
          patternAndType: tire.sizes[0]?.pattern_type || "",
          wheel: wheelType, // Uses derived wheelType
          type: tireType.tire_type,
          productSizes: {
            create: tire.sizes.map((size: any) => ({
              name: size.size,
              overallDiameter: parseFloat(size.diameter),
              overallWidth: parseFloat(size.width),
              measurementRim: size.measurement_rim,
              standardRim: size.standard_rim,
              // Random price between 300 and 2000, increasing by 100
              price: Math.floor(Math.random() * 17 + 3) * 100,
              quantity: Math.floor(Math.random() * 10 + 1),
            })),
          },
        },
      });

      console.log(`Inserted product: ${product.name}`);
    }
  }
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
