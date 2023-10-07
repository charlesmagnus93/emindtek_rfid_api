import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Length, Matches } from "class-validator";

export class CreateTag {

  @ApiProperty({ type: String, name: 'EPC', required: false })
  @IsNotEmpty()
  @Matches(/((E98A25)[0-9a-zA-Z]{10}\d{8})$/g)
  epc: string;
  
  @ApiProperty({ type: String, name: 'Antenna', required: false })
  @IsNotEmpty()
  @Matches(/[0-4]/)
  antenna: string;

  @ApiProperty({ type: String, name: 'RSSI', required: false })
  @IsNotEmpty()
  @Matches(/^(6[0-9]|5[0-9]|4[0-9]|[0-9]|2[0-9]|1[0-9]|[1-9]|70)$/g)
  rssi: string;

  @ApiProperty({ type: Number, name: 'Timestamp', required: false })
  @IsNumber()
  @IsNotEmpty()
  @Length(13, 13)
  timestampreader: number;
}