import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CreateTag } from 'src/rfid/dto/create.tag.dto';

@Injectable()
export class IntervalMinMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!this._isValidData(req.body)) {
      return res.end();
    }
    next();
  }

  private _isValidData(data: CreateTag) {
    const { epc, antenna, rssi, timestampreader } = data;
    const epc_pattern = /((E98A25)[0-9a-zA-Z]{10}\d{8})$/g;
    const antenna_pattern = /[0-4]/;
    const rssi_pattern = /^(6[0-9]|5[0-9]|4[0-9]|[0-9]|2[0-9]|1[0-9]|[1-9]|70)$/g;

    if (epc && antenna && rssi && timestampreader) {
      console.log('invalid data');
      return false;
    }
    if (!epc_pattern.test(epc)) {
      console.log('invalid epc');
      return false;
    }
    if (!antenna_pattern.test(antenna)) {
      console.log('invalid antenna');
      return false;
    }

    if (!rssi_pattern.test(rssi)) {
      console.log('invalid rssi');
      return false;
    }

    if (timestampreader?.toString().length !== 13) {
      console.log('invalid timestampreader');
      return false;
    }
    return true;
  }
}
