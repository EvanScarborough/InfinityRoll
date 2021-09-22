const jwt = require("jsonwebtoken");

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