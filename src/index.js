import db from './config/db.js';
import mongoose from 'mongoose';
import container from './container.js';

const app = container.resolve('App');

mongoose.set('strictQuery', false);

mongoose.connect(db.MONGO_URI, (err) => {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('💪 Conection to MongoDB');
        return app.start();
    }
});
