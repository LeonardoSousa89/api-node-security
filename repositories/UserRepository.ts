import { IUserRepository } from "./interface/IUserRepository";
import { User } from "../models/User";
import { mockDatabase } from "../tests/mock/db";

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
}
