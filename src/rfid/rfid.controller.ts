import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { RfidService } from './rfid.service';
import { CreateTag } from './dto/create.tag.dto';

@Controller('tags')
export class RfidController {
  constructor(private readonly rfidService: RfidService) {}

  // @SkipThrottle()
  // @Get()
  // async findAll() {
  //   return this.rfidService.findAll();
  // }

  @Post()
  async createTag(
    @Body(ValidationPipe) data: CreateTag
  ) {
    return this.rfidService.createTag(data);
  }

  // @Delete(':id')
  // async del(@Param('id') id: string) {
  //   return this.rfidService.del(+id);
  // }
}
