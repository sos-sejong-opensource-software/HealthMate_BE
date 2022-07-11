const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);

const { sequelize } = require('./models');

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    })

app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        morgan('combined')(req, res, next);
    } else {
        morgan('dev')(req, res, next);
    }
});
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie'
}));

app.use('/user', userRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json(err.message);
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'),'번 포트에서 대기 중');
})