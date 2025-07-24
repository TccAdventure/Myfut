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
    const { city, country, neighborhood, number, state, street, complement } =
      createCourtDto.address;

    const court = await this.courtsRepo.create({
      data: {
        name: createCourtDto.name,
        description: createCourtDto.description,
        imageUrl: createCourtDto.imageUrl,
        linkToGoogleMaps: createCourtDto.linkToGoogleMaps,
        userId: userId,
        courtAddress: {
          create: {
            city,
            country,
            neighborhood,
            number,
            state,
            street,
            complement,
          },
        },
      },
    });

    return { id: court.id };
  }

  findAllByUserId(userId: string) {
    return this.courtsRepo.findMany({
      where: { userId },
      include: { courtAddress: true },
    });
  }

  findOne(userId: string, courtId: string) {
    return this.courtsRepo.findUnique({
      where: { id: courtId, userId },
      include: { courtAddress: true },
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

    const { address } = updateCourtDto;

    return this.courtsRepo.update({
      where: { id: courtId },
      data: {
        name: updateCourtDto.name,
        description: updateCourtDto.description,
        imageUrl: updateCourtDto.imageUrl,
        linkToGoogleMaps: updateCourtDto.linkToGoogleMaps,
        courtAddress: {
          update: {
            city: address?.city,
            complement: address?.complement,
            country: address?.country,
            neighborhood: address?.neighborhood,
            number: address?.number,
            state: address?.state,
            street: address?.street,
          },
        },
      },
      include: { courtAddress: true },
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
