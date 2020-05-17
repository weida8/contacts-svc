import express from 'express';
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import authentication from './routes/authentication'
import contacts from './routes/contacts'
import {isAuthenticated} from './services/isAuthenticated'
import {dbName} from './constants'
import {port} from './config'

const app = express();

const logger = (req, res, next) => {
  next()
}

app.use(logger)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/authentication', authentication)
app.use('/contacts', (req, res, next) => isAuthenticated(req, res, next), contacts)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, ()=> console.log(`Example app listening at http://localhost:${port}`))
