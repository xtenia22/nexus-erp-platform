import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: Record<string, string> = {}) {
  //const { search, brand, model, year, category, min, max, sort } = query;

  const {
  search,
  brand,
  model,
  year,
  categoryId,
  productLineId,
  min,
  max,
  sort,
  page,
  limit,
} = query;

   const currentPage = page ? Number(page) : 1;
   const itemsPerPage = limit ? Number(limit) : 12;
   const skip = (currentPage - 1) * itemsPerPage; 

  const where: any = {
    product: {
      isActive: true,
    },
  };

  if (brand) {
    where.brandId = Number(brand);
  }

  if (model) {
    where.vehicleModelId = Number(model);
  }

  if (categoryId) {
  where.productLine = {
    categoryId: Number(categoryId),
  };
}

  if (productLineId) {
    where.productLineId = Number(productLineId);
  }

  if (year) {
    const selectedYear = Number(year);

    where.AND = [
      ...(where.AND ?? []),
      {
        OR: [{ yearFrom: null }, { yearFrom: { lte: selectedYear } }],
      },
      {
        OR: [{ yearTo: null }, { yearTo: { gte: selectedYear } }],
      },
    ];
  }

  if (min || max) {
    where.product = {
      ...where.product,
      price: {
        ...(min ? { gte: Number(min) } : {}),
        ...(max ? { lte: Number(max) } : {}),
      },
    };
  }

  if (search) {
    const words = search
      .trim()
      .toLowerCase()
      .split(' ')
      .filter(Boolean);

    where.AND = [
      ...(where.AND ?? []),
      ...words.map((word) => ({
        description: {
          contains: word,
        },
      })),
    ];
  }

  const orderBy =
    sort === 'name-asc'
      ? { description: 'asc' as const }
      : sort === 'name-desc'
        ? { description: 'desc' as const }
        : sort === 'price-asc'
          ? { product: { price: 'asc' as const } }
          : sort === 'price-desc'
            ? { product: { price: 'desc' as const } }
            : { id: 'asc' as const };

  const [total, fitments] = await Promise.all([
  this.prisma.productFitment.count({
    where,
  }),

  this.prisma.productFitment.findMany({
    where,
    include: {
      product: true,
      brand: true,
      vehicleModel: true,
      productLine: true,
    },
    orderBy,
    skip,
    take: itemsPerPage,
  }),
]);

  const items = fitments.map((fitment) => ({
  id: fitment.id,
  name: fitment.description,
  price: fitment.product.price,
  category: fitment.productLine.name,
  code: fitment.product.code,
  brandId: fitment.brand.id,
  brand: fitment.brand.name,
  modelId: fitment.vehicleModel.id,
  model: fitment.vehicleModel.name,
  yearFrom: fitment.yearFrom,
  yearTo: fitment.yearTo,
  image1Url: fitment.product.image1Url,
  image2Url: fitment.product.image2Url,
  brochureUrl: fitment.product.brochureUrl,
  videoUrl: fitment.product.videoUrl,
}));

return {
  items,
  total,
  page: currentPage,
  limit: itemsPerPage,
  totalPages: Math.ceil(total / itemsPerPage),
};
}

  async findOne(id: number) {
    const fitment = await this.prisma.productFitment.findUnique({
      where: { id },
      include: {
        product: true,
        brand: true,
        vehicleModel: true,
        productLine: true,
      },
    });

    if (!fitment) {
      return null;
    }

    return {
      id: fitment.id,
      name: fitment.description,
      price: fitment.product.price,
      category: fitment.productLine.name,
      code: fitment.product.code,
      brand: fitment.brand.name,
      brandId: fitment.brand.id,
      model: fitment.vehicleModel.name,      
      modelId: fitment.vehicleModel.id,
      yearFrom: fitment.yearFrom,
      yearTo: fitment.yearTo,
      image1Url: fitment.product.image1Url,
      image2Url: fitment.product.image2Url,
      brochureUrl: fitment.product.brochureUrl,
      videoUrl: fitment.product.videoUrl,
    };
  }

async getBrands(){
  
  const brands = await this.prisma.brand.findMany({
    orderBy  :{ name :'asc'},
  });

   return brands.map((b)=> ({
      id: b.id,
      name:b.name  
   }));


};


async getModels(brandId: number) {
  if (!brandId) {
    return [];
  }

  const models = await this.prisma.vehicleModel.findMany({
    where: { brandId },
    orderBy: { name: 'asc' },
  });

  return models.map((m) => ({
    id: m.id,
    name: m.name,
  }));
}

async getCategories() {
  const categories = await this.prisma.category.findMany({
    orderBy: [
      { order: 'asc' },
      { name: 'asc' },
    ],
    include: {
      lines: {
        orderBy: [
          { order: 'asc' },
          { name: 'asc' },
        ],
      },
    },
  });

  return categories.map((category) => ({
    id: category.id,
    erpId: category.erpId,
    name: category.name,
    imageUrl: category.imageUrl,
    children: category.lines.map((line) => ({
      id: line.id,
      erpId: line.erpId,
      name: line.name,
    })),
  }));
}


}