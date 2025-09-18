import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CourtAddress {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsOptional()
  complement?: string;
}

export class CourtAvailability {
  @IsNumber()
  @IsNotEmpty()
  weekday: number;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}

export class CreateCourtDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  linkToGoogleMaps?: string;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CourtAddress)
  address: CourtAddress;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CourtAvailability)
  availabilities: CourtAvailability[];
}
