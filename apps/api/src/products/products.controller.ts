import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}



  @Get()
  findAll(@Query() query: Record<string, string>) {
    return this.productsService.findAll(query);
  } 

  @Get('brands')
  getBrands() {
    return this.productsService.getBrands();
  }

  @Get('models')
  getModels(@Query('brandId') brandId: string) {
    return this.productsService.getModels(Number(brandId));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
}

