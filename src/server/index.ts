import * as bodyParser from 'body-parser';
import compress from 'compression';
import flash from 'connect-flash';
import express from 'express';
import session from 'express-session';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import socketIO from 'socket.io';
import initMongoose from './config/mongoose';
import initPassport from './config/passport';
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
    const io = socketIO(serverHTTP);
    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
            console.log(msg);
        });
        socket.on('get messages', () => {
            const messages: JSON = require('../../db/seed/messages.json');
            io.emit('get messages', messages);
        });
    });

    serverHTTP.listen(3000, () => { console.log('server running on port 3000'); });

} catch (err) {
    console.error(new Error(err));
}
