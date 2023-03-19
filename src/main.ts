import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from './pipes/validation.pipe';
import { User } from './users/users.model';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, {cors: true});

  const config = new DocumentBuilder()
    .setTitle("REO website backend")
    .setDescription("REST API documentation")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("/api/docs", app, document);

  app.useGlobalPipes(new ValidationPipe())

  await User.sync({ alter: true });
  console.log(User)

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
