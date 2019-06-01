const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const db = require('./config/database');

const app = express();
const uuid = require('uuid');

// create redis client
let client = redis.createClient();
client.on('connet', () => {
    console.log('redis connected');
})

// configure middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send('hii!')
})

app.listen(port, () => {
    console.log(`listening at port ${port}`);
})