const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./src/config/config')
const sequelize = require('./src/utils/database')
const User = require('./src/models/User')
const Chat = require('./src/models/Chat')
const GroupMembers = require('./src/models/GroupMembers')
const Message = require('./src/models/Message')
const authRoutes = require('./src/routes/authRoutes')
const chatRoutes = require('./src/routes/chatRoutes')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

Message.belongsTo(Chat)
Chat.belongsToMany(User, {through: GroupMembers})
User.belongsToMany(Chat, {through: GroupMembers})


app.use(authRoutes)
app.use(chatRoutes)

sequelize.sync()
   .then(result => {
      console.log(result)
      app.listen(config.port)
   })
   .catch(err => {
      console.log(err)
   })

