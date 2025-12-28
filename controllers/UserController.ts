import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
  private userService: UserService;

  constructor() {
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { name, email, password } = req.body;

      const user = await this.userService.create({
        name,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const users = await this.userService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;

      const user = await this.userService.getById(id);

      // IMPORTANT: service should throw UserNotFoundError
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const { email, password } = req.body;

      const updatedUser = await this.userService.update({
        id,
        email,
        password,
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;

      await this.userService.delete(id);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
