require('dotenv').config();


const  express = require('express');
const userRouter = require('./routes/auth-routes');
const port = process.env.PORT;
require('./db/db');

const app = express();

app.use(express.json());
app.use('/api', userRouter);

module.exports = app;
