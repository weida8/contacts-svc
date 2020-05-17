import {dbUserName, dbPassword} from './config';

export const dbName = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0-ofcyj.mongodb.net/test?retryWrites=true&w=majority`;

export const issuer = 'testNode'
export const subject = 'weidapan8@gmail.com'
