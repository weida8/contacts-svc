import dotenv from 'dotenv';

dotenv.config();
const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
const publicKey = process.env.PUBLIC_KEY.replace(/\\n/g, '\n');
const port = process.env.PORT;
const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

export { privateKey, publicKey, port, dbUserName, dbPassword}
