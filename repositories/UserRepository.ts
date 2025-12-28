import { IUserRepository } from "./interface/IUserRepository";
import { User } from "../models/User";
import { mockDatabase } from "../tests/mock/db";
import { UserNotFoundError } from "../errors/UserNotFoundError";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<void> {
    mockDatabase.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return mockDatabase.users.find((u) => u.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return mockDatabase.users.find((u) => u.id === id) ?? null;
  }

  async findAll(): Promise<User[]> {
    return mockDatabase.users;
  }

  async update(user: User): Promise<User> {
    const index = mockDatabase.users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      throw new UserNotFoundError()
    }

    mockDatabase.users[index] = user;
    return user;
  }

  async deleteById(id: string): Promise<boolean> {
    const index = mockDatabase.users.findIndex((u) => u.id === id);

    if (index === -1) {
      return false;
    }

    mockDatabase.users.splice(index, 1);
    return true;
  }
}
