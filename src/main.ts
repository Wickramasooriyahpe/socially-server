import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // const __dirname = './file1'

  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.useStaticAssets(join(__dirname, '..', 'avatar'));
  app.useStaticAssets('./avatar', {
    prefix: '/avatar/',
  });
  app.useStaticAssets('./files2', {
    prefix: '/files2/',
  });
  app.setBaseViewsDir(join(__dirname, '../../views'));
  app.setViewEngine('hbs');

  const port: number = parseInt(`${process.env.PORT}`) || 3000;
  await app.listen(port);
}
bootstrap();
