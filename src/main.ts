import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = +process.env.APP_PORT || 3000;

  app.setGlobalPrefix('api')

  const options = new DocumentBuilder()
  .addBearerAuth()
  .setTitle("RFID Api")
  .setDescription("RFID Api documentation")
  .setVersion("1.0")
  .addTag("RFID")
  .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
  });
}
bootstrap();
