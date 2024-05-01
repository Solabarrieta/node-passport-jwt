const bcrypt = require('bcrypt')

async function hashPassword() {
  const myPassword = 'oier1234'
  const salt = await bcrypt.genSalt();
  console.log('Salt: ', salt)
  const hash = await bcrypt.hash(myPassword, salt)
  console.log('Hash: ', hash)
  sha
}

hashPassword()
