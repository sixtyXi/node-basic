import { Validator as ClassValidator, validateOrReject, ValidationError } from 'class-validator';
import { injectable } from 'inversify';

import UserRequestDTO from '../models/DTO/user.request.dto';
import LoginDTO from '../models/DTO/login.dto';
import GroupDTO from '../models/DTO/group.dto';
import ApplicationError from '../types/ApplicationError';
import { ErrorStatus } from '../enums/errorTypes';

@injectable()
class Validator {
  private validator = new ClassValidator();

  private validate = validateOrReject;

  public async validateId(id: string): Promise<void> {
    if (!this.validator.isUUID(id)) {
      throw new ApplicationError(
        ErrorStatus.Validation,
        this.validateId.name,
        { id },
        'id must be an UUID'
      );
    }
  }

  public async validateDto(object: UserRequestDTO | GroupDTO | LoginDTO): Promise<void> {
    try {
      await this.validate(object, { validationError: { target: false } });
    } catch (error) {
      throw new ApplicationError(
        ErrorStatus.Validation,
        this.validateDto.name,
        object,
        Validator.createValidationMsg(error)
      );
    }
  }

  private static createValidationMsg(errors: ValidationError[]): string {
    const reducer = (msg: string, item: ValidationError): string => {
      return msg + Object.values(item.constraints).join(', ');
    };

    return errors.reduce(reducer, '');
  }
}

export default Validator;
