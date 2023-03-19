import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  async findOneByEmail(email: string): Promise<User> {
    return User.query().findOne({ email });
  }
  async createUser(user: Partial<User>): Promise<User> {
    return User.query().insert(user);
  }
}
