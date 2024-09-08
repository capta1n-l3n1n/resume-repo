import './ts-paths-fix-apply';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { MainModule } from './main.module';
import { initHelmet, swagger, urlBlackList } from '@setup';
import { ErrorFilter } from '@errors/filters';

const bootstrap = async () => {
  const app = await NestFactory.create(MainModule);

  // ============== use config ===========
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.useGlobalFilters(new ErrorFilter());
  app.enableCors();

  swagger(app);
  urlBlackList(app);
  initHelmet(app);

  const port = 8800;
  await app.listen(port, async () => {
    console.info(`Application is listening on port ${port} and ${await app.getUrl()} `);
  });
};
bootstrap();
