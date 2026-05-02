import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const fitments = await this.prisma.productFitment.findMany({
      include: {
        product: true,
        brand: true,
        vehicleModel: true,
        productLine: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return fitments.map((fitment) => ({
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
    }));
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


}