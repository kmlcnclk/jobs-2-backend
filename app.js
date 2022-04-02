import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mainRouter from './routers/mainRouter.js';
import customErrorHandler from './errors/customErrorHandler.js';
import connectDatabase from './database/database.js';

dotenv.config({});

connectDatabase();

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(mainRouter);

// app.get('*', (req, res) => {
//   return res.send('Not Found');
// });

app.use(customErrorHandler);

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}/`));
