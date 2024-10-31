import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface Image {
  src: string;
  alt: string;
}

export interface PeopleAlsoBuy {
  name: string;
  category: string;
  price: number;
  currency: string;
  image: Image;
  bestseller: boolean;
  featured: boolean;
  description: string;
  people_also_buy: string[];
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column('decimal')
  price: number;

  @Column({ default: "EUR" })
  currency: string;

  @Column({ type: 'json', nullable: true })
  image: Image;

  @Column({ nullable: true })
  bestseller: boolean;

  @Column({ default: false })
  featured: boolean;

  @Column({ nullable: true }) 
  description: string;

  @Column('json', { nullable: true })
  people_also_buy: PeopleAlsoBuy[];
}