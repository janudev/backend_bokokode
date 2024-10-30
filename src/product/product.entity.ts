import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
  image: { src: string; alt: string };

  @Column({ nullable: true })
  bestseller: boolean;

  @Column({ default: false })
  featured: boolean;

  @Column({ nullable: true }) 
  description: string;

  @Column('simple-array', { nullable: true })
  people_also_buy: number[];
}