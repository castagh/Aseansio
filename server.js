const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const path = require('path');
const fs = require('fs');
const multer = require("multer");
const materiRoute = require('./router/materi')
const quizRoute = require('./router/quiz')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./model');
const quiz = require('./model/quiz');
db.sequelize.sync()

app.get('/', (req, res) => {
    res.send('hello world')
})
app.use('/api/images', express.static('images'));
app.use('/api/materi', materiRoute)
app.use('/api/quiz', quizRoute)

app.listen(port, () => console.log(`App listening on port http://localhost:${port}!`))