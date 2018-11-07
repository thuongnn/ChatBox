const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Config = require('./utils/Config');

const app = express();
const userRouter = require('./routes/userRoutes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome to ChatBox API !');
});
app.use("/api/users", userRouter);

// Connect to DB
mongoose.connect(Config.mongoPath, err => {
    if (err) console.error(err);
    else console.log("Database connect successful");
});

// Run server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Gulp is running my app on  PORT: ' + port);
});