const jwt = require("jsonwebtoken");

/**
 * optionalAuth middleware
 * Authenticates the user by validating the provided jwt.
 * If the jwt is not valid or not provided, that's no problem.
 * Any endpoint using this middleware will need to check if req.user exists
 */
module.exports = function(req, res, next) {
    const token = req.header("token");
    if (!token) next();
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = decoded.user;
            next();
        } catch (e) {
            next();
        }
    }
};