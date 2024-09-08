import { StringHelper } from '@app/shared/helpers';
import { errorCode, errorMessage } from './error-message';

export abstract class BaseError extends Error {
  text: String;
  detail: any;
  code: String;

  constructor(code: string, detail: string = StringHelper.EMPTY) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
    this.text = errorMessage[code];
    this.code = code;
    this.detail = detail;
    Error.captureStackTrace(this);
  }
}

export class BcError extends BaseError {
  constructor(code: string, detail: any = StringHelper.EMPTY) {
    super(code, detail);
  }
}

export class UnknowError extends BaseError {
  constructor(detail: any = StringHelper.EMPTY) {
    super(errorCode.SYS_ERR.UNKNOW, detail);
  }
}

export class RequestInvalidError extends BaseError {
  constructor(detail: any = StringHelper.EMPTY) {
    super(errorCode.SYS_ERR.REQUEST_INVALID, detail);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(detail: any = StringHelper.EMPTY) {
    super(errorCode.SYS_ERR.UNAUTHORIZED, detail);
  }
}

export class ForbiddenError extends BaseError {
  constructor(detail: any = StringHelper.EMPTY) {
    super(errorCode.SYS_ERR.FORBIDDEN, detail);
  }
}

export class NotFoundError extends BaseError {
  constructor(detail: any = StringHelper.EMPTY) {
    super(errorCode.SYS_ERR.REQUEST_INVALID, detail);
  }
}

export class EntityExistedError extends BaseError {
  constructor(detail: any = StringHelper.EMPTY) {
    super(errorCode.SYS_ERR.ENTITY_EXISTED, detail);
  }
}

export class DataProcessError extends BaseError {
  constructor(detail: any = StringHelper.EMPTY) {
    super(errorCode.SYS_ERR.DATA_PROCESS, detail);
  }
}
