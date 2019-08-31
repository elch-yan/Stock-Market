const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors( {credentials: true, origin: 'http://localhost:3000'} ));
app.use(cookieParser());
app.use(bodyParser.json());


let mongoConnectionString;
let authSecret;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    mongoConnectionString = 'mongodb://localhost/react-auth';
    authSecret = 'h3478t384hrlweo83953sdjglasgfilahwe';
} else {
    // Yet to be implemented
}

mongoose.connect(mongoConnectionString);

const UsersModel = require('./models/users');
const UsersDao = require('./dao/users-dao');
const usersDao = new UsersDao(UsersModel);

const AuthenticationService = require('./services/authentication-service');
const authenticationService = new AuthenticationService(authSecret);
const UsersService = require('./services/users-service');
const usersService = new UsersService(usersDao, authenticationService);

app.get('/api/authentication/checkToken', authenticationService.authenticated, (req, res) => {
    res.send({
        status: 'success'
    });
});

const usersController = require('./controllers/users-controller')(usersService);
app.post('/api/users/register', usersController.register);
app.post('/api/users/authenticate', usersController.authenticate);


app.listen(process.env.NODE_PORT || 3002);