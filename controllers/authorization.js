const redisClient = require('./signin').redisClient;

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).json("unauthorized");
    }
    return redisClient.get(authorization, (err, res) => {
        if (err || !res) {
            return res.status(401).json("unauthorized");
        }
        return next();
    })
}

module.exports = {
    requireAuth
}