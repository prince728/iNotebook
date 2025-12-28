const jwt = require('jsonwebtoken');

fetchUser = (req, res, next) => {
    //get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, "your_jwt_secret_key_here");
        req.user = data.user;
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    next();
}


module.exports = fetchUser;