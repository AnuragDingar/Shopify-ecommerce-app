const jwt = require("jsonwebtoken");

const verifyIsLoggedIn = (req, res, next) => {

    try {
        const token = req.cookies.access_token;
        // console.log(token);
        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
            // by this data is availble in each api
            req.user = decode
            next()
        } catch (err) {
            console.log("err", err)
            return res.status(401).send("Unathorized. Invalid Token")
        }
    } catch (err) {
        next(err)
    }
}

const verifyIsAdmin = (req, res, next) => {

    if(req.user && req.user.isAdmin ) {
        next();
    } else {
        return res.status(401).send("Unauthorized. Admin request")
    }
}

module.exports = { verifyIsLoggedIn, verifyIsAdmin };