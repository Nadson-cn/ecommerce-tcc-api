const jwt = require("express-jwt");
const secret = require("../config").secret;

function getTokenFromHeader(req) {
  if(!req.headers.authorization) return null;
  const token = req.headers.authorization.split(" ");
  if(token[0] !== process.env.TOKEN) return null;
  return token[1];
}

const auth = {
  required: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeader
  }),

  optional: jwt({
    secret: process.env.SECRET,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;