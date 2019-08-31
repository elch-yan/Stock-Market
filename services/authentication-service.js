const { promisify } = require("util");
const jwt = (() => {
    const jwt = require("jsonwebtoken");

    return {
        sign: jwt.sign,
        verify: promisify(jwt.verify)
    };
})();

module.exports = function AuthenticationService(authSecret) {
    this.createToken = createToken;
    this.authenticated = authenticated;
    
    function createToken(email) {
        const payload = { email };
        return jwt.sign(payload, authSecret, {
            expiresIn: '2h'
        });
    }

    /**
     * Authentication middleware
     */
    async function authenticated(req, res, next) {
        const token = req.body.token || 
                        req.query.token ||
                        req.headers['x-access-token'] ||
                        req.cookies.token;
        
        if (!token) {
            return res.send({
                status: 'error',
                message: 'Unauthorized: No token provided'
            });
        } else {
            try {
                const { email } = await jwt.verify(token, authSecret);

                req.email = email;
                next();
            } catch (err) {
                return  res.send({
                    status: 'error',
                    message: 'Unauthorized: Invalid token'
                });
            }
        }
    }
}