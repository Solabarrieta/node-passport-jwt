const bcrypt = require('bcrypt')

async function hashPassword() {
  const myPassword = 'oier1234'
  const hash = '$2b$10$1IYJVEFgCeuhPZxiLviGaupNRohujMXCtFuVbq71g5Rx2mGFFRA0C'
  const isMatch = await bcrypt.compare(myPassword, hash)
  console.log(isMatch)
}

hashPassword()
