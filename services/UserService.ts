import { EmailAlreadyInUseError } from "../errors/EmailAlreadyInUseError";
import { UserNotFoundError } from "../errors/UserNotFoundError";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";
import { randomUUID } from "crypto";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserDTO {
  id: string;
  email?: string;
  password?: string;
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDTO): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(data.email);

    if (emailExists) {
      throw new EmailAlreadyInUseError();
    }

    const user = new User(
      randomUUID(),
      data.name,
      data.email,
      data.password
    );

    await this.userRepository.create(user);
    return user;
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  async update(data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (data.email && data.email !== user.email) {
      const emailAlreadyUsed = await this.userRepository.findByEmail(
        data.email
      );

      if (emailAlreadyUsed) {
        throw new EmailAlreadyInUseError();
      }

      user.email = data.email;
    }

    if (data.password) {
      user.password = data.password;
    }

    const updated = await this.userRepository.update(user);

    if (!updated) {
      throw new UserNotFoundError();
    }

    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.userRepository.deleteById(id);

    if (!deleted) {
      throw new UserNotFoundError();
    }
  }
}
