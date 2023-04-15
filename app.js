import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import logger from './server/logger.js';
import router from './server/routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', router);


app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});
