import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { 
    this.seedProducts()
  }

  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductsWithFilters(
    category?: string,
    sortKey?: string,
    sortType?: 'ASC' | 'DESC',
  ): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product');
    if (category) query.andWhere('product.category = :category', { category });
    if (sortKey) query.orderBy(`product.${sortKey}`, sortType || 'ASC');
    return query.getMany();
  }

  async seedProducts() {
    const products = [
      {
        name: 'Producto 1',
        price: 100,
        category: 'ciudades',
        featured: false,
        bestseller: false,
      },
      {
        name: 'Producto 2',
        price: 150,
        category: 'viajes',
        featured: true,
        bestseller: true,
      },
    ];
  
    for (const product of products) {
      const newProduct = this.productRepository.create(product);
      await this.productRepository.save(newProduct);
    }
  }
  
}
