import { ConfigService } from '@app/shared/config-manager';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TeleBotService {
  private readonly logger = new Logger(TeleBotService.name);
  public constructor(
    private readonly configservice: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async notifyMessage(msg: string) {
    const accessToken = this.configservice.get('TELE_TOKEN');
    const groupId = this.configservice.get('TELE_GROUP');
    try {
      this.httpService.post<any>(`https://api.telegram.org/bot${accessToken}/sendMessage?chat_id=${groupId}&text=${msg}`);
    } catch (e) {
      this.logger.error(`notifyMessage telegram fail ${e}`);
    }
  }
}
