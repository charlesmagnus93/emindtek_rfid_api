import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTag } from './dto/create.tag.dto';
import { Tag } from './entities/tagread.entity';

@Injectable()
export class RfidService {

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>
  ) {}


  findAll() {
    return this.tagRepo.find();
  }

  createTag(data: CreateTag) {
    try {
      const { epc, antenna, rssi, timestampreader } = data;

      // return data;
      const tag = new Tag();
      tag.epc = epc;
      tag.antenna = parseInt(antenna);
      tag.rssi = parseInt(rssi);
      tag.timestampreader = timestampreader;

      return tag.save();
    } catch (error) {
      console.log('err', error);
    }
  }

  async del(id: number) {
    try {
      const tag = await this.tagRepo.findOne({ where: { id } })
      if (tag) {
        // return tag;
        return tag.remove();
      }
      throw new NotFoundException();
    } catch (error) {
      throw error;
    }
  }
}
