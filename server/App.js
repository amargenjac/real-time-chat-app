const express = require('express')
const socketIO = require('socket.io');
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
const groupRoutes = require('./src/routes/groupRoutes')
const userRoutes = require('./src/routes/userRoutes')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

Message.belongsTo(Chat)
Chat.belongsToMany(User, { through: GroupMembers })
User.belongsToMany(Chat, { through: GroupMembers })

app.use(authRoutes)
app.use(groupRoutes)
app.use(chatRoutes)
app.use(userRoutes)

sequelize.sync()
   .then(result => {
      console.log(result)
      const server = app.listen(config.port)
      const io = socketIO(server, {
         cors: {
            origin: "http://localhost:8080"
         }
      });

      io.use((socket, next) => {
         const username = socket.handshake.auth.username
         const id = socket.handshake.auth.userId
         if (!username) {
            return next(new Error("invalid username"))
         }
         console.log(username)
         socket.username = username
         socket.userId = id
         next()
      });

      io.on("connection", (socket) => {
         const users = [];
         for (let [id, socket] of io.of("/").sockets) {
            users.push({
               userId: socket.userId,
               username: socket.username,
            })
         }
         socket.emit("users", users);
      })

      io.on('connection', (socket) => {
         socket.on('new message', ({ content, to }) => {
            socket.broadcast.emit('new message', {
               content,
               from: socket.username,
               to,
            })
         })
      })

      io.on("connection", (socket) => {
         // notify existing users
         socket.broadcast.emit("user connected", {
            userId: socket.userId,
            username: socket.username,
         })
      })
   })
   .catch(err => {
      console.log(err)
   })

