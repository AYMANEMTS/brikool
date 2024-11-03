const express = require('express');
const http = require('http');
const routes = require('./routes/index')
const session = require("express-session");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');
const passport = require("passport");
const initializeSocket = require("./config/socket");
const connectDB = require("./config/dbConnection");

require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(
    session({
      secret: "secret_session",
      resave: false,
      saveUninitialized: false,
    })
  );
app.use(cookieParser());
app.use(passport.initialize());

// Static folder for uploads
app.use('/uploads', express.static('uploads'));

require("./config/oauth")(passport)

// Routes
app.use(routes)

app.use(errorHandler);

const server = http.createServer(app);

initializeSocket(server);
connectDB();

const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log('Server is running on port ' + port);
});
