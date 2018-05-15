import mongoose from 'mongoose';
(mongoose as any).Promise = global.Promise;

export default function () {
    if (process.env.MONGODB_URI) {
        return mongoose.connect(
            process.env.MONGODB_URI
        )
    } else {
        throw new Error('cannot connect to the database no MONGODB_URI defined');
    }
}
