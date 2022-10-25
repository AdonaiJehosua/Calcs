const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader) {
        req.isAuth = false
        return next()
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token || token === '') {
        req.isAuth = false
        return next()
    }
    let decodedToken
    try {
        decodedToken = jwt.verify(token, config.get('jwtSecret'))
    } catch (e) {
        req.isAuth = false
        return next()
    }
    req.isAuth = true
    req.userId = decodedToken.userId
    next()
}