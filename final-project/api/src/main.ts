import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './core/swagger/swagger.config';
import { ConstansService } from './core/constans/constans.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const constansService = app.get(ConstansService);

  const port = constansService.getApiPort();
  const swaggerRute = constansService.getSwaggerRute();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  SwaggerModule.setup(
    swaggerRute,
    app,
    SwaggerModule.createDocument(app, SwaggerConfig.config, {
      deepScanRoutes: true,
    }),
  )
  console.log(`Swagger running on: localhost:${port}/${swaggerRute}`);

  app.enableCors({
    origin: '*', // Permite el acceso de cualquier origen
    methods: '*', // Permite todos los métodos HTTP
    allowedHeaders: '*', // Permite todos los encabezados
  });

  await app.listen(port);
}
bootstrap();
