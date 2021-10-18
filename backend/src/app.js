const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join('./api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.use(
    OpenApiValidator.middleware({
        apiSpec: apiSpec,
        validateRequests: true,
        validateResponses: true,
    }),
);

mongoose
    .connect(process.env.DB_CONNECTION, {useNewUrlParser: true})
    .then(() => console.log("MongoDB connected!"))
    .catch((error) => console.log(error.message));

const medicineRoutes = require('./routes/medicineRoutes.js');
const customerRoutes = require('./routes/customerRoutes.js');

app.use('/v0/medicine', medicineRoutes);
app.use('/v0/customer', customerRoutes);

app.use((err, req, res, next) => {
    res.status(err.status).json({
        message: err.message,
        errors: err.errors,
        status: err.status,
    });
});

module.exports = app;
