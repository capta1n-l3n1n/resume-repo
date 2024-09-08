import { BaseError, UnknowError } from '@errors';
import { ResponseStatus } from './response-status.enum';

export class ResponseModel {
  data: any;
  error: any;
  status: ResponseStatus;

  constructor(defaultValues: Partial<ResponseModel> = {}) {
    this.data = defaultValues.data || {};
    this.error = defaultValues.error || {};
    this.status = defaultValues.status || ResponseStatus.OK;
  }

  setError(err: any): ResponseModel {
    this.data = null;
    if (err instanceof BaseError) {
      this.error = err;
    } else {
      this.error = new UnknowError(err.message);
    }
    this.status = ResponseStatus.ERROR;
    return this;
  }

  setData(data: any): ResponseModel {
    this.data = data;
    this.error = null;
    this.status = ResponseStatus.OK;
    return this;
  }
}
