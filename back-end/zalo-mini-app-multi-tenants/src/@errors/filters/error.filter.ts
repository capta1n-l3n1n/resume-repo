import { ResponseModel } from '@app/models/response';
import { BaseError, DataProcessError, EntityExistedError, ForbiddenError, NotFoundError, RequestInvalidError, UnauthorizedError, UnknowError } from '@errors/error-base';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorFilter.name);
  catch(exception: Error, host: ArgumentsHost) {
    this.logger.debug(`exception: ${exception}`);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let resModel = new ResponseModel();
    if (exception instanceof HttpException) {
      resModel = this.handleHttpException(exception);
    } else if (exception instanceof MongoError) {
      resModel = this.handleMongoError(exception);
    } else if (exception instanceof AxiosError) {
      resModel = this.handleAxiosError(exception);
    } else if (exception instanceof BaseError) {
      resModel.setError(exception);
    } else {
      resModel.setError(new UnknowError(exception.message));
    }
    response.status(HttpStatus.OK).json(resModel);
  }

  handleHttpException(exception: HttpException) {
    this.logger.debug(`handleHttpException: ${exception}`);
    const resModel = new ResponseModel();
    switch (exception.getStatus()) {
      case 400: {
        resModel.setError(new RequestInvalidError(exception.message));
        break;
      }
      case 401: {
        resModel.setError(new UnauthorizedError(exception.message));
        break;
      }
      case 403: {
        resModel.setError(new ForbiddenError(exception.message));
        break;
      }
      case 404: {
        resModel.setError(new NotFoundError(exception.message));
        break;
      }
      default:
        resModel.setError(new UnknowError(exception.message));
    }
    return resModel;
  }

  handleMongoError(exception: MongoError) {
    this.logger.debug(`handleMongoError: ${exception}`);
    const resModel = new ResponseModel();
    if (exception.code == 11000) {
      resModel.setError(new EntityExistedError(exception.code));
    } else {
      resModel.setError(new DataProcessError(exception.code));
    }
    return resModel;
  }
  handleAxiosError(exception: AxiosError) {
    this.logger.debug(`handleAxiosError: ${exception}`);
    const resModel = new ResponseModel();
    switch (exception.response?.status) {
      case 400: {
        resModel.setError(new RequestInvalidError(exception.message));
        break;
      }
      case 401: {
        resModel.setError(new UnauthorizedError(exception.message));
        break;
      }
      case 403: {
        resModel.setError(new ForbiddenError(exception.message));
        break;
      }
      case 404: {
        resModel.setError(new NotFoundError(exception.message));
        break;
      }
      default:
        resModel.setError(new UnknowError(exception.message));
    }
    return resModel;
  }
}
