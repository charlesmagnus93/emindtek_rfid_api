import { Module } from '@nestjs/common';
import { RfidService } from './rfid.service';
import { RfidController } from './rfid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tagread.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Tag ])
  ],
  controllers: [RfidController],
  providers: [RfidService]
})
export class RfidModule {}
