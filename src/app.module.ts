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
      type: "mysql",
      logger: "advanced-console",
      logging: ['error', 'info'],
      port: parseInt(process.env.DB_PORT, 10),
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: false,
      synchronize: true,
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
