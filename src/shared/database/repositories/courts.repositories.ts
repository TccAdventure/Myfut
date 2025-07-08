import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CourtsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CourtCreateArgs) {
    return this.prismaService.court.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.CourtFindUniqueArgs) {
    return this.prismaService.court.findUnique(findUniqueDto);
  }

  findMany(findManyDto: Prisma.CourtFindManyArgs) {
    return this.prismaService.court.findMany(findManyDto);
  }

  findFirst(findFirstDto: Prisma.CourtFindFirstArgs) {
    return this.prismaService.court.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.CourtUpdateArgs) {
    return this.prismaService.court.update(updateDto);
  }

  delete(deleteDto: Prisma.CourtDeleteArgs) {
    return this.prismaService.court.delete(deleteDto);
  }
}
