import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly products = [
    {
      id: 1,
      name: 'Winch 9500lb',
      price: 1200,
    },
    {
      id: 2,
      name: 'Snorkel Hilux',
      price: 350,
    },
    {
      id: 3,
      name: 'LED Bar 42',
      price: 180,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id) ?? null;
  }
}