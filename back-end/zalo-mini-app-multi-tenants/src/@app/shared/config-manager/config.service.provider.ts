import { ConfigService } from '@app/shared/config-manager/config.service';

export const ConfigServiceProvider = {
  provide: ConfigService,
  useFactory: async (): Promise<ConfigService> => {
    return await ConfigService.getInstanseAsync();
  },
};
