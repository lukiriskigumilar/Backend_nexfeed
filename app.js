import express from 'express';
import dotenv from 'dotenv';
import * as useragent from 'express-useragent';
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import yaml from "yaml";
import fs from "fs";

import routes from './src/routes/routes.js';
import checkHealth from './src//routes/healthRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express();
dotenv.config();
const PORT = 8000;

app.use(cors());
app.use(express.json()); 

//read file swagger documentation
const swaggerFile = fs.readFileSync("./src/docs/swagger.yaml", "utf-8");
const swaggerDocument = yaml.parse(swaggerFile);
//setup swagger /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//
app.use("/health", checkHealth)




app.use(useragent.express());

app.use(`/api/${process.env.API_VERSION}`, routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || PORT}/`);
});
