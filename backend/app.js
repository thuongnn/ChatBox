const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    Config = require('./utils/Config');

const app = express();
const userRouter = require('./routes/userRoutes');
const authenRouter = require('./routes/authenRoutes');
const groupRouter = require('./routes/groupRoutes');

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, DELETE, OPTIONS"
    );

    if (req.headers.origin) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }

    res.setHeader("Access-Control-Allow-Credentials", true);

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({extended: false}));

app.get('/', (req, res) => {
    res.send('Welcome to ChatBox API !');
});
app.use("/api/users", userRouter);
app.use("/api/auth", authenRouter);
app.use("/api/group", groupRouter);

// Connect to DB
mongoose.connect(Config.mongoPath, {
    useNewUrlParser: true,
    useCreateIndex: true
}, err => {
    if (err) console.error(err);
    else console.log("Database connect successful");
});

// Run server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Gulp is running my app on  PORT: ' + port);
});