import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('Wallet')
export class WalletEntity {
  @Index()
  @PrimaryColumn({ type: 'varchar', length: 42 })
  address: string;

  @Column()
  nickName: string;

  @Column()
  name: string;

  @Column({ type: 'varchar' })
  prvKey: string;

  @Column({ type: 'varchar' })
  pubKey: string;

  @Column()
  secret: string;
}
