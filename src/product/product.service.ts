import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Product } from './product.entity';
import { productData } from './data/product.data';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private entityManager: EntityManager,
  ) {  this.deleteAllProducts().then(() => this.seedDB()); }

  async deleteAllProducts() {
    await this.productRepository.clear();
    await this.entityManager.query("DELETE FROM sqlite_sequence WHERE name='product'");
  }  

  // Get product by id
  async getProductById(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  // Get products with filters
  async getProductsWithFilters(
    categories?: string[],
    sortKey?: string,
    sortType: 'ASC' | 'DESC' = 'ASC',
    page: number = 1,
    pageSize: number = 6,
  ): Promise<{ products: Product[], total: number }> {
    const query = this.productRepository.createQueryBuilder('product');

    // Filtrado
    if (categories && categories.length > 0) {
      query.andWhere('product.category IN (:...categories)', { categories });
    }

    const featuredProduct = await this.productRepository.findOne({ where: { featured: true } });

    if (sortKey) {
      query.orderBy(`product.${sortKey}`, sortType);
    }

    // Paginación
    const total = await query.getCount();
    const products = await query.skip((page - 1) * pageSize).take(pageSize).getMany();

    if (featuredProduct && !products.some(product => product.id === featuredProduct.id)) {
      products.unshift(featuredProduct);
    }

    const filteredTotal = total - 1; // Eliminamos el destacado del total

    return { products, total: filteredTotal };
  }
  
  async seedDB() {
    await this.productRepository.save(productData);
  }
} 