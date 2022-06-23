import { EntityManager, expr, MikroORM } from '@mikro-orm/core';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) { }
  
  async create(createUserInput: CreateUserInput) {
    const exists = await this.em.findOne(User, {login: createUserInput.login});
      if (exists == null) {
        const user = new User(createUserInput);
        await this.em.persistAndFlush(user);
        return user;
      } else throw new HttpException("Login Already Exists", HttpStatus.BAD_REQUEST);
  }

  async findAll() {
    const users = await this.em.find(User, {});
      users.forEach((x) => (x.password = null));
      users.sort((a, b) => a.id - b.id)
      return users;
  }

  async findOne(id: number) {
    const user = await this.em.findOneOrFail(User, { id: id });
      user.password = null;
      return user;
  }

  async findByFullName(fullname: String) {
    const users = await this.em.find(User, { [expr('lower(fullname)')]: { $like: '%'+fullname+'%'} });
    users.forEach((x) => (x.password = null));
    users.sort((a, b) => a.id - b.id)
    return users;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(id);
    Object.keys(user).forEach(element => {
      if (user[element] != updateUserInput[element]) user[element] = updateUserInput[element];
    });
    await this.em.persistAndFlush(user);
    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.em.nativeDelete(User, { id: id });
    this.em.flush();
    return user;
  }
}
