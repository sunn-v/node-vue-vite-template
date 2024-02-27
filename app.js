const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));

app.use(express.json({ limit: '2mb'}));
app.use(express.urlencoded({extended: false, limit: '2mb'}));

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'production') {
  app.use("/", express.static(path.join(__dirname, 'dist')));
} else {
  app.use('/src', require('./routes/assets.routes'))
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
