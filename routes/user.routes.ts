import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       409:
 *         description: Email já está em uso
 *       500:
 *         description: Erro interno do servidor
 */
userRoutes.post("/", (req: Request, res: Response, next: NextFunction) =>
  userController.create(req, res, next)
);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       500:
 *         description: Erro interno do servidor
 */
userRoutes.get("/", (req: Request, res: Response, next: NextFunction) =>
  userController.getAll(req, res, next)
);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
userRoutes.get("/:id", (req: Request, res: Response, next: NextFunction) =>
  userController.getById(req, res, next)
);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Atualiza email e/ou senha do usuário
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: novo@email.com
 *               password:
 *                 type: string
 *                 example: novaSenha123
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       409:
 *         description: Email já está em uso
 *       500:
 *         description: Erro interno do servidor
 */
userRoutes.put("/:id", (req: Request, res: Response, next: NextFunction) =>
  userController.update(req, res, next)
);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
userRoutes.delete("/:id", (req: Request, res: Response, next: NextFunction) =>
  userController.delete(req, res, next)
);

export { userRoutes };
