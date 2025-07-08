import { Module } from '@nestjs/common';
import { CourtsController } from './courts.controller';
import { CourtsService } from './services/courts.service';
import { ValidateCourtOwnershipService } from './services/validate-court-ownership.service';

@Module({
  controllers: [CourtsController],
  providers: [CourtsService, ValidateCourtOwnershipService],
})
export class CourtsModule {}
