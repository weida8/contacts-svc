import express from 'express';
import {dbName} from '../constants'
import { MongoClient } from 'mongodb'

const router = express.Router();
const contactsCollection = 'contacts';

router.post('/getContacts', (req, res) => {
  MongoClient.connect(dbName, async (err, client) => {
    if(err) {
      return res.status(500).json({
        status: 500,
        message: 'Cannot establish connection to database'
      })
    };
    const db = client.db('qa');
    const query = {authentication_id: req.body.userName}
    db.collection(contactsCollection).findOne(query)
      .then(response => res.json({
        status: 200,
        data: response
      }))
      .catch(error => {
        throw error
      })
  })
})

router.post('/addContacts', (req, res) => {
  MongoClient.connect(dbName, async (err, client) => {
    if(err) throw err;
    console.log('connection ready')

    const db = client.db('qa');
    db.collection(contactsCollection).findOneAndUpdate(
    {authentication_id: req.body.userName},
    {$push: {contactList: req.body.contact}},
    {new: true,
    upsert: true})
    .then(response => res.json({
      status: 200,
      data: response
    }))
    .catch(error => res.json({
      error: error
    }))
  })
})

export default router;
