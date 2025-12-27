import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { UserNotFoundError } from "../errors/UserNotFoundError";

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

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { email, password } = req.body;

    const updatedUser = await this.userService.update({
      id,
      email,
      password,
    });

    return res.status(200).json(updatedUser);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await this.userService.delete(id);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ message: error.message });
      }

      // erro inesperado
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
