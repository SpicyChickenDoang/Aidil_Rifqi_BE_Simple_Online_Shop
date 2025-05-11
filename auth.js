const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.createToken = (payload) => {
    console.log(payload);

    const token = jwt.sign({ email: payload.email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '24h' });

    return token;
}

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        if (verified) {
            req.body.access = verified;
            next()
        } else {
            res.send('errrrror')
        }
    } catch (err) {
        res.send(err.message)
    }
}


