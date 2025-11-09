import express from 'express';
import dotenv from 'dotenv';

import routes from './src/routes/routes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express();
dotenv.config();
const PORT = 8000;

app.use(express.json());

app.use(`/api/${process.env.API_VERSION}`, routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || PORT}/`);
});
