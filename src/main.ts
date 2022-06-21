import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors(
    //{origin: configService.get('FRONTEND_URL'),
    //credentials: true}
  );
  
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();

