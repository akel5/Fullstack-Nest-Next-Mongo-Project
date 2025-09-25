import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // הוסף את השורה הזו
  await app.listen(3001); // הפעל על פורט 3001
}
bootstrap();