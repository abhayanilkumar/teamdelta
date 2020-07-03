const mongoose = require('mongoose');

mongoose
            //mongo "mongodb+srv://delta-orchard.e3qog.mongodb.net/delta" --username abhayanilkumar
    .connect('mongodb://127.0.0.1/candidates', { useNewUrlParser: true })
    .catch((e) => {
        console.error('Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;