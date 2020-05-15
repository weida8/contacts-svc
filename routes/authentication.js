import express from 'express'
import bcrypt from 'bcryptjs';
import {dbName} from '../constants'
import { MongoClient } from 'mongodb'
import {sign, verify} from '../services/jwtServices'

const router = express.Router();
const authCollection = 'authentication';

router.post('/login', (req, res) => {
  MongoClient.connect(dbName, async (err, client) => {
    if(err) {
      return res.status(500).json({
        status: 500,
        message: 'Cannot establish connection to database'
      })
    };

    const db = client.db('test');
    const dbstatus = await db.collection(authCollection).stats();

    if(dbstatus.nindexes === 0) {
      return res.status(500).json({
        status: 500,
        data: 'table not found'
      })
    }

    db.collection(authCollection).find({
      userName: req.body.userName
    }).toArray((err, result) => {
      if(err || result.length < 1) {
        return res.status(404).json({
        status: 400,
        message: 'Incorrect password/Username does\'t exist'
      })
    }
    bcrypt.compare(req.body.password, result[0].password)
      .then(result => {
        if(result && req.body.hostname) {
          const token = sign(req.body);
          res.json({
            status: 200,
            message: 'you are logged in!',
            token: token,
            userName: req.body.userName
          })
        } else {
          res.status(400).json({
            status: 400,
            message: 'Something went wrong with the authentication server'
          })
        }
      })
    })
  })
})

router.post('/register', (req, res) => {
  MongoClient.connect(dbName, async (err, client) => {
    if(err) {
      return res.status(500).json({
        status: 500,
        message: 'Cannot establish connection to database'
      })
    };

    const db = client.db('test');
    const dbstatus = await db.collection(authCollection).stats();

    if(dbstatus.nindexes === 0) {
      return res.status(500).json({
        status: 500,
        data: 'table not found'
      })
    }

   db.collection(authCollection).find({
      userName: req.body.userName
    }).toArray((err, result) => {
      if (err) {
        console.log(err)
        return err;
      } else if (result.length < 1) {
        bcrypt.hash(req.body.password, 12).then((hash) => {
        const userObj = {
          userName: req.body.userName,
          password: hash
        }
        db.collection(authCollection).insertOne(userObj)
        .then(response => {
          return res.json({
            status: 200,
            data: response
          })
        })
        .catch(error => {
          console.log(error)
          res.status(500).json({
            status: 500,
            message: 'error while registering'
          })
        })
      })
    } else if(result.length >= 1) {
        return res.status(400).json({
          status: 400,
          message: 'username already exists!'
        })
      }
    })
  })
})

export default router;
