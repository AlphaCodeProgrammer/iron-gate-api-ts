import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try{
      await this.$connect();
      console.log('✅Prisma Connected to the database successfully');
    } catch (error) {
      console.error('❌Prisma Connection failed:', error);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('🔌 Prisma Disconnected from the database');
    } catch (error) {
      console.error('❌Prisma Connection failed:', error);
    }
  }
}
