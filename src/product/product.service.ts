import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Product } from './product.entity';

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
        name: "Samurai King Resting",
        category: "pets",
        price: 261,
        currency: "EUR",
        image: {
          src: "https://technical-frontend-api.bokokode.com/img/Product_Featured_product.png",
          alt: "Nostrum consequatur ut nesciunt quia hic qui quis."
        },
        bestseller: false,
        featured: true,
        description: "Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi.",
        people_also_buy: []
      },
      {
        name: "Nature Landscape",
        category: "nature",
        price: 470,
        currency: "EUR",
        image: {
          src: "https://technical-frontend-api.bokokode.com/img/Product_1.png",
          alt: "Nostrum consequatur ut nesciunt quia hic qui quis."
        },
        bestseller: false,
        description: "Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi.",
        featured: false,
        people_also_buy: []
      },
      {
        name: "City Skyline",
        category: "cities",
        price: 306,
        currency: "EUR",
        image: {
          src: "https://technical-frontend-api.bokokode.com/img/Product_6.png",
          alt: "Nostrum consequatur ut nesciunt quia hic qui quis."
        },
        bestseller: false,
        featured: false,
        description: "Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi.",
        people_also_buy: []
      },
      {
        name: "Urban Exploration",
        category: "cities",
        price: 370,
        currency: "EUR",
        image: {
          src: "https://technical-frontend-api.bokokode.com/img/Product_6.png",
          alt: "Nostrum consequatur ut nesciunt quia hic qui quis."
        },
        bestseller: true,
        featured: false,
        description: "Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi.",
        people_also_buy: []
      },
      {
        name: "Gourmet Food",
        category: "food",
        price: 221,
        currency: "EUR",
        image: {
          src: "https://technical-frontend-api.bokokode.com/img/Product_3.png",
          alt: "Nostrum consequatur ut nesciunt quia hic qui quis."
        },
        bestseller: false,
        featured: false,
        description: "Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi.",
        people_also_buy: []
      },
      {
        name: "Red bench",
        category: "people",
        price: 126,
        currency: "EUR",
        image: {
          src: "https://technical-frontend-api.bokokode.com/img/Product_4.png",
          alt: "Nostrum consequatur ut nesciunt quia hic qui quis."
        },
        bestseller: false,
        featured: false,
        description: "Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi.",
        people_also_buy: []
      },
      {
        name: "Architecture",
        category: "landmarks",
        price: 101.00,
        currency: "EUR",
        image: {
          src: "https://technical-frontend-api.bokokode.com/img/Product_2.png",
          alt: "Nostrum consequatur ut nesciunt quia hic qui quis."
        },
        bestseller: false,
        featured: false,
        description: "Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi.",
        people_also_buy: []
      },
      {
        name: "Premium window",
        category: "premium",
        price: 12.00,
        currency: "EUR",
        image: {
          src: "https://technical-frontend-api.bokokode.com/img/Product_5.png",
          alt: "Nostrum consequatur ut nesciunt quia hic qui quis."
        },
        bestseller: false,
        featured: false,
        description: "Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi.",
        people_also_buy: []
      },
    ];
  
    for (const product of products) {
      const newProduct = this.productRepository.create(product);
      await this.productRepository.save(newProduct);
    }
  }
}  