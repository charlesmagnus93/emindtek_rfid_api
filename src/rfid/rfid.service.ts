import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { CreateTag } from './dto/create.tag.dto';
import { Tag } from './entities/tagread.entity';

@Injectable()
export class RfidService {

  constructor(
    @InjectRepository(Tag)
    private readonly tagRepo: Repository<Tag>
  ) { }

  private async _isValid(epc: string, antenna: number) {
    const selected = await this.tagRepo.findOne({ where: { epc, antenna } });
    if (selected) {
      const interval = moment().diff(moment(+selected.timestampreader), 'seconds');
      if (interval <= 10) {
        return false;
      }
      return true;
    }
    return true;
  }

  findAll() {
    return this.tagRepo.find();
  }

  async createTag(data: CreateTag) {
    try {
      const { epc, antenna, rssi, timestampreader } = data;
  
      const canSave = await this._isValid(epc, parseInt(antenna));

      if (canSave) {
        const tag = new Tag();
        tag.epc = epc;
        tag.antenna = parseInt(antenna);
        tag.rssi = parseInt(rssi);
        tag.timestampreader = timestampreader;

        return tag.save().catch((err) => {
          if (err?.code === '23505') {
            throw new ConflictException(err?.detail);
          }
        });
      }
    } catch (error) {
      throw error;
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
