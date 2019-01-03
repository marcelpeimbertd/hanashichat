import * as bodyParser from 'body-parser';
import compress from 'compression';
import flash from 'connect-flash';
import express from 'express';
import session from 'express-session';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import initMongoose from './config/mongoose';
import initPassport from './config/passport';
import initSockets from './config/socketio';
import setApiRoutes from './routes/apiRoutes';

try {
    const app = express();
    const passport = initPassport();
    initMongoose();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.set('port', (process.env.PORT || 3000));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'config.sessionSecret',
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    setApiRoutes(app, passport);
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use('*', (req, res, next) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    });

    const serverHTTP = http.createServer(app);
    initSockets(serverHTTP);

    const PORT = process.env.PORT || 3000;
    serverHTTP.listen(PORT, () => { console.log(`server running on port ${PORT}`); });

} catch (err) {
    console.error(new Error(err));
}
