import express, { Application } from 'express';
import bodyParser from 'body-parser';
import AuthenticationController from './controllers/AuthenticationController';
import GamesController from './controllers/GamesController';
import cors, {CorsOptions} from 'cors';

const app: Application =  express();

const corsOption: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOption))
app.use(bodyParser.json());

AuthenticationController.mount(app);
GamesController.mount(app);

export default app;