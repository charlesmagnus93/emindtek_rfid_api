import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RfidService } from './rfid.service';
import { RfidController } from './rfid.controller';
import { Tag } from './entities/tagread.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Tag ])
  ],
  controllers: [RfidController],
  providers: [RfidService]
})
export class RfidModule {}
