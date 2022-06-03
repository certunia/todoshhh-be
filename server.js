require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () =>  console.error('Connected to Database'))

// Passport config
require('./config/passport')(passport)

// Session middleware *above passport*
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL })
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())

app.use('/todoshhh', require('./routes/todoshhh'))
app.use('/auth', require('./routes/auth'))

app.listen(process.env.PORT, () => console.log('Server Started'))
