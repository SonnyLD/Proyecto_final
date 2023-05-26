import dotenv from 'dotenv';
dotenv.config();

const db = {
    PORT: process.env.PORT || 8080,
    MONGO_URI: process.env.MONGO_URI,
    SECRET: process.env.SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    SECRET_KEY_STRIPE: process.env.SECRET_KEY_STRIPE,
    APP_ID: process.env.APP_ID,
    NODE_ENV: process.env.NODE_ENV || 'development',
};

export default db;