const myMiddleware = ((req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.user = decode
        next()
    } catch (error) {
        res.status('401').send('Auth failed')   
    }
})

module.exports = myMiddleware;