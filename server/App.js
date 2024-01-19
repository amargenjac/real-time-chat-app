const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./src/config/config')
const sequelize = require('./src/utils/database')
const User = require('./src/models/User')
const Chat = require('./src/models/Chat')
const UserChat = require('./src/models/UsersChat')
const Message = require('./src/models/Message')
const authRoutes = require('./src/routes/authRoutes')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

Chat.belongsToMany(User, {through: UserChat})
User.belongsToMany(Chat, {through: UserChat})

app.use(authRoutes)

Message.belongsTo(UserChat)

sequelize.sync({force: true})
   .then(result => {
      console.log(result)
      app.listen(config.port)
   })
   .catch(err => {
      console.log(err)
   })

