require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const fs = require("fs")
const https = require("https")
const key = fs.readFileSync("localhost-key.pem", "utf-8")
const cert = fs.readFileSync("localhost.pem", "utf-8")

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () =>  console.error('Connected to Database'))

// Passport config
require('./config/passport')(passport)

// disable CORS
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL, // update to match the domain you will make the request from
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH', 'OPTIONS'],
  credentials: true,
  maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
}));

// Session middleware *above passport*
app.use(session({
  secret: 'siljbpwbpwb',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL })
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())

app.use('/todoshhh', require('./routes/todoshhh'))
app.use('/auth', require('./routes/auth'))

app.get("/hello", async (req, res) => {
  res.json({ Hello: "World" });
});

app.listen(process.env.PORT, () => console.log('Server Started'))

// https.createServer({ key, cert }, app).listen(process.env.PORT);
