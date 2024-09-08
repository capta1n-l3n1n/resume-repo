import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function swagger(app: INestApplication): INestApplication {
  const options = new DocumentBuilder()
    .setTitle("Admin Core")
    .setDescription("The API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);
  return app;
}
