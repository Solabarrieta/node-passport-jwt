const jwt = require('jsonwebtoken');

const secret = 'myDog' //Este secret debería estar en una variable de entorno. No debería de estar en código

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxNDU1MDk4M30.5t97c44euNNBe5zv70mcrjDXFtfiCDL7Xpqd0kPfFGU";

function signToken(token, secret) {
  return jwt.verify(token, secret)
}

const payload = signToken(token, secret)

console.log(payload)


/**
 *! Esto solo debe de ocurrir en el Backend
 */
