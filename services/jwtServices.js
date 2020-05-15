import fs from 'fs'
import jwt from 'jsonwebtoken'
import {issuer, subject} from '../constants'

const privateKEY  = fs.readFileSync('./private.key', 'utf8');
const publicKEY  = fs.readFileSync('./public.key', 'utf8');

export const sign = (payload) => {
  const signOptions = {
    issuer: issuer,
    subject: subject,
    audience: payload.hostname,
    expiresIn: "12h",
    algorithm: "RS256"
  }

  try {
    return jwt.sign(payload, privateKEY, signOptions)
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
    return jwt.verify(req.body.token, publicKEY, verifyOptions)
  } catch (err) {
    throw err;
  }
}

export const decode = (token) => {
  return jwt.decode(token, {complete: true})
}
