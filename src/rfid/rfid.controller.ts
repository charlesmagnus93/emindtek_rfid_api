import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { RfidService } from './rfid.service';
import { CreateTag } from './dto/create.tag.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('tags')
export class RfidController {
  constructor(private readonly rfidService: RfidService) {}

  // @Get()
  // async findAll() {
  //   return this.rfidService.findAll();
  // }

  @ApiBody({ type: CreateTag })
  @Post()
  async createTag(
    @Body() data: CreateTag
  ) {
    return this.rfidService.createTag(data);
  }

  // @Delete(':id')
  // async del(@Param('id') id: string) {
  //   return this.rfidService.del(+id);
  // }
}
