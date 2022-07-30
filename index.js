const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config =  require('config');
const Joi = require("joi");
const { response, urlencoded } = require('express');
const express = require('express');
const morgran = require('morgan');
const helmet = require('helmet');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(urlencoded({extended: true}));s
app.use(express.static('public'));
app.use(helmet());

//for any route starting with /api.courses, use this module
app.use('/api/courses', courses);
app.use('/', home);

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enbaled...');
}

dbDebugger('Connected to the database'); 

const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`listening on port ${port}.`));