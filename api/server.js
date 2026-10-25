require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require("cors");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3002;
const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de roupas e categorias',
            version: '1.0.0'
        },
        servers: [{ url: `http://localhost:${PORT}` }]
    },
    apis: [
    path.join(__dirname, 'src', 'routes', 'roupas.routes.js'),
    path.join(__dirname, 'src', 'routes', 'categorias.routes.js')
]
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const roupasRoutes = require('./src/routes/roupas.routes');
const categoriasRutes = require('./src/routes/categorias.routes');

app.use('/roupas', roupasRoutes);
app.use('/categorias', categoriasRutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Documentação Swagger em http://localhost:${PORT}/api-docs`);
});

module.exports = app;