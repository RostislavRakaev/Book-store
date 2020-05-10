const jwt = require('jsonwebtoken');

const JWT_secret = 'some_secret_jwt'

module.exports.checkTokenForAdmin = function (req, res, next) {
    const header = req.headers['authorization'];
    
    if (header) {
        try {
            let authorization = header.split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                jwt.verify(authorization[1], JWT_secret, (err, decoded)=>{
                    if(decoded.role === 'admin') {
                        req.jwt = decoded;
                        next();
                    }
                    else {
                        return res.status(403).send();
                    }
                });
            }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
  }

module.exports.checkTokenForUser = function(req, res, next) {
    
}