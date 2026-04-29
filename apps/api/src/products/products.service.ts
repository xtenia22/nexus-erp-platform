import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly products = [
    {
      id: 1,
      name: 'PERSIANA RETRACTIL B-ROLL TOYOTA HILUX 16+',
      price: 1200,
      category: "PERSIANAS"
    },
    {
      id: 2,
      name: 'TAPA RIGIDA B-ROUGH FORD RANGER C/D 2023+ LIMITED',
      price: 350,
      category: "TAPAS"
    },
    {
      id: 3,
      name: 'BAUL PLAST.”EXPEDICION” L.130cm AN.55cm AL.45cm',
      price: 180,
      category:"BAULES PLASTICOS"
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id) ?? null;
  }
}