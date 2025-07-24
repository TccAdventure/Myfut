import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { CourtAddress, CreateCourtDto } from './create-court.dto';

class PartialUpdateCourtDto extends PartialType(CourtAddress) {}

export class UpdateCourtDto extends PartialType(
  OmitType(CreateCourtDto, ['address'] as const),
) {
  @ValidateNested()
  @Type(() => PartialUpdateCourtDto)
  @IsOptional()
  address?: PartialUpdateCourtDto;
}
