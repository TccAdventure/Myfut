import { Injectable, NotFoundException } from '@nestjs/common';
import { CourtsRepository } from 'src/shared/database/repositories/courts.repositories';

@Injectable()
export class ValidateCourtOwnershipService {
  constructor(private readonly courtsRepo: CourtsRepository) {}

  async validate(userId: string, courtId: string) {
    const isOwner = await this.courtsRepo.findFirst({
      where: { id: courtId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Court not found.');
    }
  }
}
