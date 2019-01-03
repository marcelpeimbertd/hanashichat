import initMongoose from './config/mongoose';
import initServer from './server/init';

function init() {
    const server = initServer();
    const PORT = process.env.PORT || 5000
    server.listen(PORT, () => { console.log(`Auth server running on port ${PORT}`); });
    initMongoose();
}

init();
