const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .regex(new RegExp('^[a-zA-Z0-9]{8,32}$'))
        .required(),
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(32)
        .required()
    })

    const { error } = schema.validate(req.body)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            message: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            message: `The password provided failed to match the following rules:
                    <br>
                    1. It must contain ONLY the following characters: lower case, upper case, numerics.
                    <br>
                    2. It must be at least 8 characters in length and not greater than 32 characters in length.
                  `
          })
          break
        case 'username': {
          res.status(400).send({
            message: `The username provided failed to match the following rules:
                    <br>
                    1. It must contain ONLY alphanumerical signs.
                    <br>
                    2. It must be at least 3 characters in length and not greater than 32 characters in length.
                    <br>`
          })
          break
        }
        default:
          res.status(400).send({
            message: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}