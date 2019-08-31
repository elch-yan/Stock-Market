const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const Users = new Schema({
    email: { type: String, required: true, unique: true },
    balance: { type: Number },
    password: { type: String, required: true }
});

Users.pre('save', async function(next) {
    // Check if document is new
    if (this.isNew) {
        // Saving reference to this because of changing scopes
        const document = this;
        try {
            const hashedPassword = await bcrypt.hash(document.password, saltRounds);

            document.password = hashedPassword;
            next();
        } catch (err) {
            next(err);
        }
    }

    next();
});

module.exports = mongoose.model('users', Users);
