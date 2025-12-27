import request from "supertest";
import { app } from "../index";
import { mockDatabase } from "../tests/mock/db";
import { UserRepository } from "../repositories/UserRepository";

describe("Users CRUD (E2E)", () => {
  beforeEach(() => {
    mockDatabase.users = [];
  });

  /**
   * ==========================
   * POST /users
   * ==========================
   */
  describe("POST /users", () => {
    it("201 → cria usuário", async () => {
      const res = await request(app).post("/users").send({
        name: "Leo",
        email: "leo@email.com",
        password: "123456",
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
    });

    it("409 → email duplicado", async () => {
      await request(app).post("/users").send({
        name: "User 1",
        email: "dup@email.com",
        password: "123",
      });

      const res = await request(app).post("/users").send({
        name: "User 2",
        email: "dup@email.com",
        password: "123",
      });

      expect(res.status).toBe(409);
      expect(res.body.message).toBeDefined();
    });

    it("500 → erro inesperado", async () => {
      jest
        .spyOn(UserRepository.prototype, "create")
        .mockRejectedValueOnce(new Error("Unexpected error"));

      const res = await request(app).post("/users").send({
        name: "Fail",
        email: "fail@email.com",
        password: "123",
      });

      expect(res.status).toBe(500);
    });
  });

  /**
   * ==========================
   * GET /users
   * ==========================
   */
  describe("GET /users", () => {
    it("200 → lista usuários", async () => {
      await request(app).post("/users").send({
        name: "Leo",
        email: "list@email.com",
        password: "123",
      });

      const res = await request(app).get("/users");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  /**
   * ==========================
   * GET /users/:id
   * ==========================
   */
  describe("GET /users/:id", () => {
    it("200 → usuário encontrado", async () => {
      const create = await request(app).post("/users").send({
        name: "Leo",
        email: "get@email.com",
        password: "123",
      });

      const res = await request(app).get(`/users/${create.body.id}`);

      expect(res.status).toBe(200);
    });

    it("404 → usuário não encontrado", async () => {
      const res = await request(app).get(
        "/users/00000000-0000-0000-0000-000000000000"
      );

      expect(res.status).toBe(404);
    });
  });

  /**
   * ==========================
   * PUT /users/:id
   * ==========================
   */
  describe("PUT /users/:id", () => {
    it("200 → atualiza email", async () => {
      const create = await request(app).post("/users").send({
        name: "Leo",
        email: "old@email.com",
        password: "123",
      });

      const res = await request(app)
        .put(`/users/${create.body.id}`)
        .send({ email: "new@email.com" });

      expect(res.status).toBe(200);
      expect(res.body.email).toBe("new@email.com");
    });

    it("404 → usuário inexistente", async () => {
      const res = await request(app)
        .put("/users/00000000-0000-0000-0000-000000000000")
        .send({ email: "x@email.com" });

      expect(res.status).toBe(404);
    });

    it("409 → email já em uso", async () => {
      await request(app).post("/users").send({
        name: "User 1",
        email: "used@email.com",
        password: "123",
      });

      const second = await request(app).post("/users").send({
        name: "User 2",
        email: "other@email.com",
        password: "123",
      });

      const res = await request(app)
        .put(`/users/${second.body.id}`)
        .send({ email: "used@email.com" });

      expect(res.status).toBe(409);
    });
  });

  /**
   * ==========================
   * DELETE /users/:id
   * ==========================
   */
  describe("DELETE /users/:id", () => {
    it("204 → remove usuário", async () => {
      const create = await request(app).post("/users").send({
        name: "Leo",
        email: "delete@email.com",
        password: "123",
      });

      const res = await request(app).delete(`/users/${create.body.id}`);

      expect(res.status).toBe(204);
    });

    it("404 → usuário inexistente", async () => {
      const res = await request(app).delete(
        "/users/00000000-0000-0000-0000-000000000000"
      );

      expect(res.status).toBe(404);
    });
  });
});
