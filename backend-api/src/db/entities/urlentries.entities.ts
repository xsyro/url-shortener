import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('url_entries')
export class UrlEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longtext', nullable: false })
  url: string;

  @Column({ type: 'varchar', length: 255 })
  shortUrl: string;

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
