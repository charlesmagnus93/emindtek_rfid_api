import { IsNotEmpty, IsNumber, Matches } from "class-validator";

export class CreateTag {

  @IsNotEmpty()
  @Matches(/((E98A25)[0-9a-zA-Z]{10}\d{8})$/g)
  epc: string;
  
  @IsNotEmpty()
  @Matches(/[0-4]/)
  antenna: string;

  @IsNotEmpty()
  @Matches(/^(6[0-9]|5[0-9]|4[0-9]|[0-9]|2[0-9]|1[0-9]|[1-9]|70)$/g)
  rssi: string;

  @IsNumber()
  @IsNotEmpty()
  timestampreader: number;
}