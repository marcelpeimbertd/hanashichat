import mongoose from 'mongoose';
(mongoose as any).Promise = global.Promise;

export default async function initMongoose() {
    if (process.env.MONGODB_URI) {
        await mongoose.connect(process.env.MONGODB_URI).catch((error) => { console.error(error); });
    } else {
        throw new Error('cannot connect to the database no MONGODB_URI defined');
    }
}
