import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  findAll() {
    return [
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
  }
}