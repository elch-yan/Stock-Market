const assert = require('assert');

module.exports = function UsersDao(UsersModel) {
    this.create = create;
    this.update = update;
    this.getUserById = getUserById;
    this.getUser = getUser;

    async function create(userData) {
        const user = new UsersModel(userData);

        return user.save();
    }

    async function update(id, user) {
        const oldUser = await getUserById(id, { writable: true });
        assert(oldUser, 'User not found!');

        Object.keys(user).forEach(k => {
            oldUser[k] = user[k];
        });

        oldUser.save();
    }

    async function getUserById(id, { fields, writable = false } = {}) {
        return getUser({ id }, { fields, writable });
    }

    async function getUser(query, { fields = {}, writable = false } = {}) {
        let promise = UsersModel.findOne(query, fields)
        !writable && (promise = promise.lean());

        return promise;
    }
}