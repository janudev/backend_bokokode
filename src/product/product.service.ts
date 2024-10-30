import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async deleteAllProducts() {
    await this.productRepository.clear();
  }  

  // Get product by id - GET 
  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  // Get products with filters - POST
  async getProductsWithFilters(
    categories?: string[], 
    sortKey?: string, 
    sortType: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product');
  
    // Filtrar por categorías
    if (categories && categories.length > 0) {
      query.andWhere('product.category IN (:...categories)', {
        categories,
      });
    }
  
    // Ordenar por clave y tipo
    if (sortKey) {
      query.orderBy(`product.${sortKey}`, sortType);
    }
  
    return query.getMany();
  }  
  
  async seedDB() {
    const products = [
      {
        name: 'Mascotaaa',
        category: 'pets',
        price: 16,
        currency: "EUR",
        image: {
          src: "https://technical-frontend-api.bokokode.com/img/Product_2.png",
          alt: "Voluptas non praesentium sed molestiae."
        },
        bestseller: false,
        featured: false,
        description: "Esto es una desc para mascota",
        people_also_buy: []
      },
      {
        name: 'Naturalezaa',
        category: 'nature',
        price: 160,
        currency: "EUR",
        image: {
          src: "https://technical-frontend-api.bokokode.com/img/Product_1.png",
          alt: "Illo illo aut similique odit qui."
        },
        bestseller: true,
        featured: true,
        description: "Esto es una desc para mascota",
        people_also_buy: []
      },
    ];
  
    for (const product of products) {
      const newProduct = this.productRepository.create(product);
      await this.productRepository.save(newProduct);
    }
  }
  
}
