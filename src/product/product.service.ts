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
        category: "Pets",
        price: 261,
        currency: "EUR",
        image: {
          src: "https://technical-frontend-api.bokokode.com/img/Product_Featured_product.png",
          alt: "Nostrum consequatur ut nesciunt quia hic qui quis."
        },
        bestseller: false,
        featured: true,
        description: "Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi.",
        people_also_buy: [
          {
              name: "Man",
              category: "People",
              price: 261,
              currency: "EUR",
              image: {
                src: "https://technical-frontend-api.bokokode.com/img/Product_4.png",
                alt: "Accusamus officia sunt qui officiis quod."
              },
              bestseller: true,
              featured: false,
              description: "Incidunt libero consequatur inventore voluptas neque dolor odit. Suscipit quos ab quo voluptatem. Saepe a ut ad et ratione.",
              people_also_buy: [],
          },
          {
              name: "Everest Mountain",
              category: "Nature",
              price: 470,
              currency: "EUR",
              image: {
                src: "https://technical-frontend-api.bokokode.com/img/Product_1.png",
                alt: "Nostrum consequatur ut nesciunt quia hic qui quis."
              },
              bestseller: false,
              featured: false,
              description: "Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi.",
              people_also_buy: [],
          },
          {
              name: "Eum maxime",
              category: "Cities",
              price: 306,
              currency: "EUR",
              image: {
                src: "https://technical-frontend-api.bokokode.com/img/Product_6.png",
                alt: "Tempore vel iste sed ea."
              },
              bestseller: false,
              featured: false,
              description: "Ab unde voluptate quidem omnis mollitia eligendi vitae animi. Eius praesentium asperiores est quia. Dolor earum eaque laudantium aperiam possimus temporibus amet et.",
              people_also_buy: [],
          }
      ]
      },
      {
        name: "Nature Landscape",
        category: "Nature",
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
        category: "Cities",
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
        category: "Cities",
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
        category: "Food",
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
        category: "People",
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
        category: "Landmarks",
        price: 101,
        currency: "EUR",
        image: {
          src: "https://technical-frontend-api.bokokode.com/img/Product_2.png",
          alt: "Nostrum consequatur ut nesciunt quia hic qui quis."
        },
        bestseller: true,
        featured: false,
        description: "Molestias nam enim sunt. Doloremque voluptatem quisquam excepturi.",
        people_also_buy: []
      },
      {
        name: "Premium window",
        category: "Premium",
        price: 12,
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