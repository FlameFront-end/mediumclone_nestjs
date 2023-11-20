import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(process.env.DATABASE_NAME);
}
bootstrap();
