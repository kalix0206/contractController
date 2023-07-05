import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('Contract')
export class ContractEntity {
  @Index()
  @PrimaryColumn({ type: 'varchar', length: 42 })
  contractAddress: string;

  @Column()
  name: string;

  @Column({ type: 'longtext' })
  code: string;

  @Column({ type: 'blob' })
  byteCode: Buffer;

  @Column({ type: 'longtext' })
  abiCode: string;
}
