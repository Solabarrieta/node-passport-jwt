const jwt = require('jsonwebtoken');

const secret = 'myDog' //Este secret debería estar en una variable de entorno. No debería de estar en código

const payload = {
  sub: 1,
  role: 'customer',
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret)
}

const token = signToken(payload, secret)

console.log(token)
