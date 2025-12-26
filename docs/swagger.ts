// 📘 Documentação oficial do swagger-jsdoc
// https://github.com/Surnet/swagger-jsdoc

// 📘 Documentação oficial do swagger-ui-express
// https://github.com/scottie1984/swagger-ui-express
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";

dotenv.config();

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description:
        "API de usuários construída com Node.js, TypeScript e Express",
    },
    servers: [
      {
        url: `http://${process.env.HOST}:${process.env.PORT}`,
        description: "Rede local",
      },
    ],
  },
  apis: ["**/routes/*.{ts,js}"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
