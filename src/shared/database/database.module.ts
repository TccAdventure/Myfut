import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CourtsRepository } from './repositories/courts.repositories';
import { UsersRepository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CourtsRepository],
  exports: [UsersRepository, CourtsRepository],
})
export class DatabaseModule {}
