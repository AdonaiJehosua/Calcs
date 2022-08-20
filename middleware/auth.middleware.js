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



    // if (req.method === 'OPTIONS') {
    //     return next
    // }
    //
    // try {
    //     const token = req.headers.authorization.split(' ')[1]
    //
    //     if (!token) {
    //         return res.status(401).json({message: 'Нет авторизации'})
    //     }
    //
    //     const decoded = jwt.verify(token, config.get('jwtSecret'))
    //     req.user = decoded
    //     next()
    //
    // } catch (e) {
    //     res.status(401).json({message: 'Лажа с авторизацией'})
    // }
}