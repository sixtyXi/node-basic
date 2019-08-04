import { Validator as ClassValidator, validateOrReject } from 'class-validator';
import { injectable } from 'inversify';

import UserRequestDTO from '../models/DTO/user.request.dto';
import GroupDTO from '../models/DTO/group.dto';

@injectable()
class Validator {
  private validator = new ClassValidator();

  private validate = validateOrReject;

  public async validateId(id: string): Promise<void> {
    if (!this.validator.isUUID(id)) {
      throw new Error('id must be an UUID');
    }
  }

  public validateUser(object: UserRequestDTO): Promise<void> {
    return this.validate(object);
  }

  public validateGroup(object: GroupDTO): Promise<void> {
    return this.validate(object);
  }
}

export default Validator;
