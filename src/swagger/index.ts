import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerConfig from "./config";

const swaggerSpec = swaggerJsdoc(swaggerConfig);

export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec);

export default { swaggerServe, swaggerSetup };
