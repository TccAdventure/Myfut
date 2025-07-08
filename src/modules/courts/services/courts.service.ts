import { Injectable } from '@nestjs/common';
import { CourtsRepository } from 'src/shared/database/repositories/courts.repositories';
import { CreateCourtDto } from '../dto/create-court.dto';
import { UpdateCourtDto } from '../dto/update-court.dto';
import { ValidateCourtOwnershipService } from './validate-court-ownership.service';

@Injectable()
export class CourtsService {
  constructor(
    private readonly courtsRepo: CourtsRepository,
    private readonly validateCourtOwnershipService: ValidateCourtOwnershipService,
  ) {}

  async create(userId: string, createCourtDto: CreateCourtDto) {
    const court = await this.courtsRepo.create({
      data: {
        name: createCourtDto.name,
        description: createCourtDto.description,
        imageUrl: createCourtDto.imageUrl,
        linkToGoogleMaps: createCourtDto.linkToGoogleMaps,
        userId: userId,
      },
    });

    return { id: court.id };
  }

  findAllByUserId(userId: string) {
    return this.courtsRepo.findMany({
      where: { userId },
    });
  }

  findOne(userId: string, courtId: string) {
    return this.courtsRepo.findUnique({
      where: { id: courtId, userId },
    });
  }

  async update(
    userId: string,
    courtId: string,
    updateCourtDto: UpdateCourtDto,
  ) {
    await this.validateEntitiesOwnerShip({
      userId,
      courtId,
    });

    return this.courtsRepo.update({
      where: { id: courtId },
      data: {
        name: updateCourtDto.name,
        description: updateCourtDto.description,
        imageUrl: updateCourtDto.imageUrl,
        linkToGoogleMaps: updateCourtDto.linkToGoogleMaps,
      },
    });
  }

  async remove(userId: string, courtId: string) {
    await this.validateEntitiesOwnerShip({
      userId,
      courtId,
    });

    await this.courtsRepo.delete({
      where: { id: courtId },
    });

    return null;
  }

  private async validateEntitiesOwnerShip({
    userId,
    courtId,
  }: {
    userId: string;
    courtId?: string;
  }) {
    await Promise.all([
      courtId && this.validateCourtOwnershipService.validate(userId, courtId),
    ]);
  }
}
