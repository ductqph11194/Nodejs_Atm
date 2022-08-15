
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
var mongoose = require('mongoose');
const accountRouter = require('./routes/account');
const authRouter = require('./routes/users');
const verifyToken = require('./middlewares/verifyToken');
const transactionRouter = require('./routes/transaction');
const session = require('express-session')
const passport = require('passport');
const flash = require('connect-flash');
require('./middlewares/verifyToken');


var app = express();
dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', verifyToken, accountRouter);
app.use('/api', verifyToken, transactionRouter);
app.use('/auth', authRouter);

app.use(session({
  secret: 'adsa897adsa98bs',
  resave: false,
  saveUninitialized: false,
}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session());


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/atm+project", {
  useNewUrlParser: true
}).then(() => {
  console.log('DB connected')
});
mongoose.connection.on('error', (err) => {
  console.log(`Error ${err.message}`)
})

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log('hello', port);
})

module.exports = app;
