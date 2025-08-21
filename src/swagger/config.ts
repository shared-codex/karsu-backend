import { Options } from "swagger-jsdoc";

const swaggerConfig: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Karsu API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerConfig;
