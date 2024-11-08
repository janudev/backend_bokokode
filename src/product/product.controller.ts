import { Controller, Get, Param, Post, Body } from '@nestjs/common';
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
  async getProducts(
    @Body() body: { categories?: string[], sort?: { key: string; type: 'ASC' | 'DESC' }, page?: number, pageSize?: number }
  ): Promise<{ products: Product[], total: number }> {
    const { categories, sort, page, pageSize } = body;
    return this.productService.getProductsWithFilters(categories, sort?.key, sort?.type, page, pageSize);
  }
}