import express, { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { userRoutes } from "./routes/user.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { errorHandler } from "./errors/errorHandler";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/users", [userRoutes]);

const PORT = Number(process.env.PORT);

app.use(errorHandler);

export { app };

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, "0.0.0.0", () => {
    console.table({ up: `🚀 Server running on port ${PORT}` });
  });
}
