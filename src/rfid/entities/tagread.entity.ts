import { BaseEntity, BeforeInsert, Column, PrimaryGeneratedColumn, Entity, Unique } from "typeorm";

@Entity("tagread")
@Unique(['epc', 'antenna'])
export class Tag extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  epc: string;

  @Column({ type: 'int' })
  antenna: number;

  @Column({ type: 'int' })
  rssi: number;

  @Column({ type: 'bigint' })
  timestampreader: number;

  @Column({ type: 'bigint' })
  timestamprecv: number;

  @BeforeInsert()
  setCreatedAt() {
    this.timestamprecv = new Date().getTime();
  }
}

function unique(arg0: {}): (target: typeof Tag) => void | typeof Tag {
  throw new Error("Function not implemented.");
}
