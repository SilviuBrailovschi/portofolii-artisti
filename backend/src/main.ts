import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: {
      origin: '*',
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },});
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
  const port = process.env.PORT || 3001;
  await app.listen(port);
}
bootstrap();


