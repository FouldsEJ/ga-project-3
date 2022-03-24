import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 3000;

export const dbUrl = process.env.dbURL || 'mongodb://127.0.0.1:27017/places';

export const secret = process.env.SECRET || 'pineapples';
