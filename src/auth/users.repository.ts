import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // generate salt and hash, and save the hashed passeword
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        // duplicate username
        /**
         * There are some fancy ways to handle this kind of error and there are some less
         * fancy ways.
         * For keeping things simples, We are handling it here right now.
         * For production, we might make an enumeration that would have very verbal text that dupliate username
         * Then the service would handle throwing the error
         *
         * For now we are handling it this (straighforward) way
         */

        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
