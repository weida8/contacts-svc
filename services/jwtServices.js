import fs from 'fs'
import jwt from 'jsonwebtoken'
import {issuer, subject} from '../constants'

let privateKey = fs.readFileSync('./private.key')
let publicKey = fs.readFileSync('./public.key')

export const sign = (payload) => {
  const signOptions = {
    issuer: issuer,
    subject: subject,
    audience: payload.hostname,
    expiresIn: "12h",
    algorithm: "RS256"
  }
  try {
    return jwt.sign(payload, privateKey, signOptions)
  } catch(err) {
    throw err;
  }
}

export const verify = (req) => {

  const verifyOptions = {
    issuer: issuer,
    subject: subject,
    audience: req.body.hostname,
    expiresIn: "12h",
    algorithm: ["RS256"]
  }
  try {
    return jwt.verify(req.body.token, publicKey, verifyOptions)
  } catch (err) {
    throw err;
  }
}

export const decode = (token) => {
  return jwt.decode(token, {complete: true})
}
