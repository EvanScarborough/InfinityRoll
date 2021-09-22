const jwt = require("jsonwebtoken");

/**
 * auth middleware
 * Authenticates the user by validating the provided jwt.
 * If the jwt is not valid or not provided, an error will be returned
 */
module.exports = function(req, res, next) {
    const token = req.header("token");
    if (!token) return res.status(401).json({ message: "Auth Error" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid Token" });
    }
};