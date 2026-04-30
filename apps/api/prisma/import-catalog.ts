import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import catalog from "./data/catalog-export.json";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });
type ErpBrand = {
  IDMARCA: number;
  MARCA: string;
};

type ErpModel = {
  IDMARCA: number;
  IDMODELO: number;
  MODELO: string;
  ORDEN?: number;
};

type ErpLine = {
  IDLINEAPROD: number;
  LINEAPRODUCTO: string;
  ORDEN?: number;
};

type ErpArticle = {
  NROART: number;
  IDGRUPO?: number;
  SECUENCIA?: number;
  MARCA: number;
  MODELO: number;
  LINEA: number;
  DESDEANO?: number;
  HASTAANO?: number;
  URLVIDEO?: string;
  MATPRI?: number;
  PRECIO: number;
  CODIGO: string;
  DESCRIPCION: string;
  OBSEVACION?: string;
  IMG1?: string;
  IMG2?: string;
  FOLLETO?: string;
};

type CatalogExport = {
  ARTICULOS_ASOC: ErpArticle[];
  MARCAS: ErpBrand[];
  MODELOS: ErpModel[];
  LINEAS: ErpLine[];
};

const data = catalog as CatalogExport;

function normalizeYearTo(value?: number) {
  if (!value || value === 0) {
    return null;
  }

  return value;
}

async function main() {
  console.log("Importando catálogo...");

  for (const brand of data.MARCAS) {
    await prisma.brand.upsert({
      where: { erpId: brand.IDMARCA },
      update: {
        name: brand.MARCA,
      },
      create: {
        erpId: brand.IDMARCA,
        name: brand.MARCA,
      },
    });
  }

  for (const line of data.LINEAS) {
    await prisma.productLine.upsert({
      where: { erpId: line.IDLINEAPROD },
      update: {
        name: line.LINEAPRODUCTO,
        order: line.ORDEN ?? null,
      },
      create: {
        erpId: line.IDLINEAPROD,
        name: line.LINEAPRODUCTO,
        order: line.ORDEN ?? null,
      },
    });
  }

  for (const model of data.MODELOS) {
    const brand = await prisma.brand.findUnique({
      where: { erpId: model.IDMARCA },
    });

    if (!brand) {
      console.warn(`Marca no encontrada para modelo ${model.MODELO}`);
      continue;
    }

    await prisma.vehicleModel.upsert({
      where: {
        brandId_erpId: {
          brandId: brand.id,
          erpId: model.IDMODELO,
        },
      },
      update: {
        name: model.MODELO,
        order: model.ORDEN ?? null,
      },
      create: {
        erpId: model.IDMODELO,
        name: model.MODELO,
        order: model.ORDEN ?? null,
        brandId: brand.id,
      },
    });
  }

  for (const article of data.ARTICULOS_ASOC) {
    const product = await prisma.product.upsert({
      where: { erpId: article.NROART },
      update: {
        code: article.CODIGO,
        price: article.PRECIO,
        primaryMaterial: article.MATPRI ?? null,
        image1Url: article.IMG1 ?? null,
        image2Url: article.IMG2 ?? null,
        brochureUrl: article.FOLLETO ?? null,
        videoUrl: article.URLVIDEO ?? null,
        isActive: true,
      },
      create: {
        erpId: article.NROART,
        code: article.CODIGO,
        price: article.PRECIO,
        primaryMaterial: article.MATPRI ?? null,
        image1Url: article.IMG1 ?? null,
        image2Url: article.IMG2 ?? null,
        brochureUrl: article.FOLLETO ?? null,
        videoUrl: article.URLVIDEO ?? null,
        isActive: true,
      },
    });

    const brand = await prisma.brand.findUnique({
      where: { erpId: article.MARCA },
    });

    if (!brand) {
      console.warn(`Marca no encontrada para artículo ${article.CODIGO}`);
      continue;
    }

    const vehicleModel = await prisma.vehicleModel.findUnique({
      where: {
        brandId_erpId: {
          brandId: brand.id,
          erpId: article.MODELO,
        },
      },
    });

    if (!vehicleModel) {
      console.warn(`Modelo no encontrado para artículo ${article.CODIGO}`);
      continue;
    }

    const productLine = await prisma.productLine.findUnique({
      where: { erpId: article.LINEA },
    });

    if (!productLine) {
      console.warn(`Línea no encontrada para artículo ${article.CODIGO}`);
      continue;
    }

   const yearFrom = article.DESDEANO ?? null;
const yearTo = normalizeYearTo(article.HASTAANO);

const existingFitment = await prisma.productFitment.findFirst({
  where: {
    productId: product.id,
    brandId: brand.id,
    vehicleModelId: vehicleModel.id,
    productLineId: productLine.id,
    yearFrom,
    yearTo,
  },
});

if (existingFitment) {
  await prisma.productFitment.update({
    where: {
      id: existingFitment.id,
    },
    data: {
      description: article.DESCRIPCION,
      observation: article.OBSEVACION ?? null,
      groupId: article.IDGRUPO ?? null,
      sequence: article.SECUENCIA ?? null,
    },
  });
} else {
  await prisma.productFitment.create({
    data: {
      productId: product.id,
      brandId: brand.id,
      vehicleModelId: vehicleModel.id,
      productLineId: productLine.id,
      description: article.DESCRIPCION,
      observation: article.OBSEVACION ?? null,
      groupId: article.IDGRUPO ?? null,
      sequence: article.SECUENCIA ?? null,
      yearFrom,
      yearTo,
    },
  });
}
  }

  console.log("Importación finalizada.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });