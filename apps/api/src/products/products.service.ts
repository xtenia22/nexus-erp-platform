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
      model: fitment.vehicleModel.name,
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
      model: fitment.vehicleModel.name,
      yearFrom: fitment.yearFrom,
      yearTo: fitment.yearTo,
      image1Url: fitment.product.image1Url,
      image2Url: fitment.product.image2Url,
      brochureUrl: fitment.product.brochureUrl,
      videoUrl: fitment.product.videoUrl,
    };
  }
}