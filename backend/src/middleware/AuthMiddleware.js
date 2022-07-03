/***********************************************************************
************ Author:    Christian KEMGANG NGUESSOP *********************
************ Version:    1.0.0                      ********************
***********************************************************************/

const jwt = require("jsonwebtoken");

const config = process.env;

//Check and verify token
module.exports.verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"]; /*|| req.body.token || req.query.token ;*/

    if (!token)
        return res.status(403).send("Access denied. Not authenticated...");
    try {
        const decodeUser = await jwt.verify(token, config.SECRET_TOKEN);
        req.user = decodeUser;
    } catch (err) {
        return res.status(401).send("Invalid Token!");
    }
    return next();
};

// Authorized user or administrator
module.exports.verifyTokenAndAuthorized = async (req, res, next) => {
    await this.verifyToken(req, res, () => {
        if (req.user._id === req.params.id || req.user.role === "ROOT" || req.user.role === "ADMIN")
            return next();
        else
            return res.status(403).json("Access denied. Not authorized!");
    })
};

// Authorized administrator
module.exports.verifyTokenAndAuthorizedAdmin = async (req, res, next) => {
    await this.verifyToken(req, res, () => {
        if (req.user.role === "ROOT" || req.user.role === "ADMIN")
            return next();
        else
            return res.status(403).json("Access denied. Not authorized!!!");
    })
};
