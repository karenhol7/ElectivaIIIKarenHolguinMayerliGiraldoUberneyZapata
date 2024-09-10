const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API HUNTED APP",
      version: "1.0.0",
      description: "Documentación de la API de Tareas", 
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/comments/routes/comment.routing.js", "./src/products/routes/product.routing.js", "./src/user/routes/user.routing.js" ]
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};