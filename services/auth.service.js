const boom = require('@hapi/boom');
const UserService = require('./user.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config')

const service = new UserService()

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email)

    if (!user) throw boom.unauthorized()

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw boom.unauthorized()

    delete user.dataValues.password
    return user
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret)
    return {user, token}
  }

  async sendRecovery(email) {
    //Check user
    const user = await service.findByEmail(email)
    if (!user) throw boom.unauthorized()
    const payload = {sub: user.id}
    const recoveryToken = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'})
    const link = `http://myfrontend.com/recovery?token=${recoveryToken}`

    await service.update(user.id, { recoveryToken: recoveryToken })

    const mail = {
      from: 'oieruni22@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Email para recuperar contraseña", // Subject line
      html: `<b>Clica en el link para recuperar la contrasea: ${link} </b>`, // html body
    }
    const response = await this.sendEmail(mail)
    return response
  }

  async sendEmail(mailContent) {
    //Create transporter config
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.emailSenderEmail,
        pass: config.emailSenderPass
      }
    });
    try {
      const response = await transporter.sendMail(mailContent)
      return response
    } catch (error) {
      throw boom.internal()
    }
    //Send the email
  }

  async changePassword(token, newPassword) {
    try {
      //Verify token and get payload
      const payload = jwt.verify(token, config.jwtSecret)

      //Get user with userId obtained from payload.sub
      const user = await service.findOne(payload.sub)

      //Compare user.recoveryToken with the token sent by client
      if (user.recoveryToken !== token) throw boom.unauthorized()

      //Hash the new password sent by client if the token are equal
      const hash = await bcrypt.hash(newPassword, 10);

      //Update password and set recoveryToken to null
      const response = await service.update(user.id, { recoveryToken: null, password: hash })
      return response

    } catch (error) {
      throw boom.unauthorized()
    }
  }
}

module.exports = AuthService;
