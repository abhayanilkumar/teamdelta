const express = require('express');
const app = express();
const fs = require('fs');
const clientSessions = require('client-sessions');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const candidateRouter = require('./routes/candidate-router');
const apiPort = 3000;

const storage = multer.diskStorage({
    destination: "./public/images/uploaded/",
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use(clientSessions({
    cookieName: "session", 
    secret: "deltaorchardabhay",
    duration: 3 * 60 * 1000, // 3minutes
    activeDuration: 1000 * 60 
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Test');
});

app.use('/api', candidateRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));