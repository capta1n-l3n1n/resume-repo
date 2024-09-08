import { RequestInvalidError } from '@errors/error-base';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const ModelValidation = () => new CustomValidationPipe();

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  static validate() {
    return new CustomValidationPipe();
  }
  async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, Object.assign({}, value));
    const errors = await validate(object, { skipMissingProperties: false });
    if (errors.length === 0) {
      return value;
    }

    const errs = {};
    errors.forEach(error => {
      for (const name in error.constraints) {
        if (error.constraints.hasOwnProperty(name)) {
          const errorMessage = error.constraints[name];
          return (errs[error.property] = errorMessage);
        }
      }
    });
    throw new RequestInvalidError(errs);
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
