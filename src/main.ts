import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { MyLogger } from "src/services/logger/my-logger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false,
    logger: new MyLogger(),
  });
  app.setGlobalPrefix("api");
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle("Tablet")
    .setDescription("The Tablet API description")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.SERVER_PORT || 3069);
}
bootstrap();
