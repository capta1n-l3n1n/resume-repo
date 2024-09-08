import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CustomerItemDTO } from '@app/models/response';
import { ArrayHelper, StringHelper } from '@app/shared/helpers';
import { IAppInfoDto } from '@app/models/request';
import { BcError } from '@errors/error-base';
import { errorCode } from '@errors/index';

@Injectable()
export class CustomerElasticService {
  private readonly logger = new Logger(CustomerElasticService.name);
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async searchByPhone(phone: string, appInfo: IAppInfoDto) {
    this.logger.debug(`searchByPhone: `, phone);
    if (StringHelper.isEmpty(appInfo.config)) {
      throw new BcError(errorCode.ZALO_APP_ERR.ELASTIC_INDEX_NOT_FOUND);
    }
    const data = await this.elasticsearchService.search({
      index: appInfo.config,
      body: {
        query: {
          match: {
            Customer_Phone: phone,
          },
        },
      },
    });
    if (ArrayHelper.isEmpty(data.hits.hits)) return null;
    const dto = new CustomerItemDTO();
    dto.convertByElastic(data.hits.hits[0]);
    return dto;
  }
}
