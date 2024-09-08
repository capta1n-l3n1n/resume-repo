import { INestApplication } from '@nestjs/common';
import filter from 'content-filter';

export function urlBlackList(app: INestApplication): INestApplication {

    const urlBlackList = [];

    app.use(filter({ urlBlackList }));
    app.use(
        filter({ urlMessage: 'A forbidden expression has been found in URL: ' }),
    );

    return app;
}
