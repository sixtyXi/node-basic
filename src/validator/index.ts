import { Validator as ClassValidator, validateOrReject } from 'class-validator';
import { injectable } from 'inversify';

import UserRequestDTO from '../models/DTO/user.request.dto';
import LoginDTO from '../models/DTO/login.dto';
import GroupDTO from '../models/DTO/group.dto';
import CustomError from '../types/CustomError';
import { ErrorType } from '../enums/errorTypes';

@injectable()
class Validator {
  private validator = new ClassValidator();

  private validate = validateOrReject;

  public async validateId(id: string): Promise<void> {
    if (!this.validator.isUUID(id)) {
      throw new CustomError(
        ErrorType.Validation,
        this.validateId.name,
        { id },
        'id must be an UUID'
      );
    }
  }

  public validateDto(object: UserRequestDTO | GroupDTO | LoginDTO): Promise<void> {
    return this.validate(object, { validationError: { target: false } });
  }
}

export default Validator;
