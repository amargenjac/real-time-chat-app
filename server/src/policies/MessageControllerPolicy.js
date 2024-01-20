const Joi = require('joi')

exports.ValidateMessage = (req, res, next) => {
        const schema = Joi.object ({
            messageText: Joi.string()
                    .regex(new RegExp('^.{1,300}$'))
                    .required(),
            user: Joi.object()
                .required()
          })
      
        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
              case 'messageText':
                res.status(400).send({
                  error: 'Message must not be empty and must be less than 300 characters'
                })
                break
              default:
                console.error(error)
                res.status(400).send({
                  error: 'Invalid message information'
                })
            }
        } else {
            next()
          }      
}