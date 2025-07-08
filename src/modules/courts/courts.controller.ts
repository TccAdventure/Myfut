import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/activeUserId';
import { Roles } from 'src/shared/decorators/roles';
import { RoleType } from '../auth/entities/Auth';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { CourtsService } from './services/courts.service';

@Controller('courts')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) {}

  @Post()
  @Roles([RoleType.COURT_ADMIN])
  create(
    @ActiveUserId() userId: string,
    @Body() createCourtDto: CreateCourtDto,
  ) {
    return this.courtsService.create(userId, createCourtDto);
  }

  @Get()
  @Roles([RoleType.COURT_ADMIN])
  findAll(@ActiveUserId() userId: string) {
    return this.courtsService.findAllByUserId(userId);
  }

  @Get(':id')
  @Roles([RoleType.COURT_ADMIN])
  findOne(@ActiveUserId() userId: string, @Param('id') id: string) {
    return this.courtsService.findOne(userId, id);
  }

  @Patch(':id')
  @Roles([RoleType.COURT_ADMIN])
  update(
    @ActiveUserId() userId: string,
    @Param('id') id: string,
    @Body() updateCourtDto: UpdateCourtDto,
  ) {
    return this.courtsService.update(userId, id, updateCourtDto);
  }

  @Delete(':id')
  @Roles([RoleType.COURT_ADMIN])
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@ActiveUserId() userId: string, @Param('id') id: string) {
    return this.courtsService.remove(userId, id);
  }
}
