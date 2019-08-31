const bcrypt = require('bcrypt');
const assert = require('assert');

module.exports = function UsersService(usersDao, authenticationService) {
    this.register = register;
    this.authenticate = authenticate;

    async function register(userData) {
        const user = await usersDao.create(userData);

        return authenticationService.createToken(user.email);
    }

    async function authenticate({ email, password }) {
        const user = await usersDao.getUser({ email });
        assert(user, 'User with specified email not found');

        assert(await bcrypt.compare(password, user.password), 'Incorrect password');

        return authenticationService.createToken(user.email);
    }

}