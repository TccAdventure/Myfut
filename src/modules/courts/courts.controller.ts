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
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { CourtsService } from './services/courts.service';

@Controller('courts')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createCourtDto: CreateCourtDto,
  ) {
    return this.courtsService.create(userId, createCourtDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.courtsService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@ActiveUserId() userId: string, @Param('id') id: string) {
    return this.courtsService.findOne(userId, id);
  }

  @Patch(':id')
  update(
    @ActiveUserId() userId: string,
    @Param('id') id: string,
    @Body() updateCourtDto: UpdateCourtDto,
  ) {
    return this.courtsService.update(userId, id, updateCourtDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@ActiveUserId() userId: string, @Param('id') id: string) {
    return this.courtsService.remove(userId, id);
  }
}
