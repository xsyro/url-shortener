import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('url')
export class UrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  url: string;

  @Column({ type: 'varchar', length: 8, unique: true })
  shortUrlId: string;

  @Column({ type: 'int', default: 0, nullable: false })
  clicks: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
