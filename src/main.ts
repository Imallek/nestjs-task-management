import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * We are telling NestJs that whenever you encounter validation decorator
   * e.g @IsNotEmpty() It will know to execute the validation pipes
   * */
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
