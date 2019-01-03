import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import authenticationRoutes from './../routes/authentication';

export default function initServer() {
    const app = express();
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    authenticationRoutes(app);

    app.use('/', (req, res) => {
        res.send('hi');
    })
    return app;
}
