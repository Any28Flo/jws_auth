const mongoose = require('mongoose');


mongoose
    .connect(`${process.env.DB_URL}`, {useNewUrlParser: true ,  useCreateIndex: true})

    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });
