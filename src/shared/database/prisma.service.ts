import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // TODO: find a way to do this behavior in prisma V6
  async enableShutdownHooks(app: INestApplication) {
    // this.$on('beforeExit', async () => {
    //   await app.close();
    // });
  }
}
