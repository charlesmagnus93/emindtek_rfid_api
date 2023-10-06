import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { RfidModule } from './rfid/rfid.module';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      logger: "advanced-console",
      logging: ['error', 'info'],
      host: process.env.DB_HOST /* || 'postgres-db' */,
      port: +process.env.DB_PORT/*  || 5432 */,
      username: process.env.DB_USERNAME/*  || 'postgres' */,
      password: process.env.DB_PASSWORD /* || 'postgres' */,
      database: process.env.DB_NAME /* || 'etk' */,
      ssl: false,
      synchronize: false,
      entities: [__dirname + '/**/**.entity{.ts,.js}'],
    }),
    ThrottlerModule.forRoot([{
      ttl: 10000,
      limit: 1,
    }]),
    RfidModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
