const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const cors = require('cors');
const db = require('./config/database');
const app = express();
const uuid = require('uuid');

//import routes
const usersRoute = require('./routes/users');

// create redis client
let client = redis.createClient();
client.on('connet', () => {
    console.log('redis connected');
})

// configure middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

// Set up session with redis client
app.use(session({
    genid: function(req) {
        return uuid(); //use UUIDs for session IDs
    },
    secret: 'ssssshhhh',
    saveUninitialized: true,
    resave: true,
    store: new RedisStore({ client }),
    cookie: {
        secure: false,
        maxAge: 30 * 24 * 60 * 1000 // 30 days
    }
}));

// Initialize database
db.authenticate()
    .then(() => console.log('database connected'))
    .catch(err => console.log('SOMETHING WRONG WITH DATABASE', err));

const port = process.env.PORT || 5000;

// Set routes
app.get('/', (req, res)=>{
    res.send('hi there!')
})

app.use('/users', usersRoute);

app.listen(port, () => {
    console.log(`listening at port ${port}`);
})