import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  getProductById(@Param('id') id: number): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post()
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Post('filter')
  getProductsWithFilters(
    @Body('category') category: string,
    @Body('sort') sort: { key: string; type: 'ASC' | 'DESC' },
  ): Promise<Product[]> {
    const { key, type } = sort || {};
    return this.productService.getProductsWithFilters(category, key, type);
  }
}
