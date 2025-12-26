import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
  private userService: UserService;

  constructor() {
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const user = await this.userService.create({
      name,
      email,
      password,
    });

    return res.status(201).json(user);
  }

  async getAll(_req: Request, res: Response): Promise<Response> {
    const users = await this.userService.getAll();
    return res.status(200).json(users);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const user = await this.userService.getById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  }
}
