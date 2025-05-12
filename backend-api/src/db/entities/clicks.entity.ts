import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UrlEntry } from './url.entity';

export class UrlClick {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UrlEntry, (urlEntry) => urlEntry.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'url_entry_id' })
  urlEntry: UrlEntry;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ipAddress: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  userAgent: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  clickedAt: Date;
}
