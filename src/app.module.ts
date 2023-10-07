import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { RfidModule } from './rfid/rfid.module';
import { AppService } from './app.service';
import { IntervalMinMiddleware } from './middleware/interval-min/interval-min.middleware';

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
      synchronize: true,
      entities: [__dirname + '/**/**.entity{.ts,.js}'],
    }),
    RfidModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IntervalMinMiddleware)
      .forRoutes({path: 'tags', method: RequestMethod.POST});
  }
}
