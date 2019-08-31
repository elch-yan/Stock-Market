
module.exports = (usersService) => {
    return {
        register: async (req, res, next) => {
            try {
                const { email, password } = req.body;

                const token = await usersService.register({ email, password });

                res.cookie('token', token).send({
                    status: 'success'
                });
            } catch (err) {
                res.send({
                    status: 'error',
                    message: err.message
                });
            }
        },
        authenticate: async (req, res, next) => {
            try {
                const { email, password } = req.body;

                const token = await usersService.authenticate({ email, password });

                res.cookie('token', token).send({
                    status: 'success'
                });
            } catch (err) {
                res.send({
                    status: 'error',
                    message: err.message
                });
            }
        }
    }
}