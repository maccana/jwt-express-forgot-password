
function isAuth(req, res, next) {
    const authorized = false
    if (authorized) {
        // User is authoried, call next
        console.log('Auth passed...')
        next()
    } else {
        // User is not authorized
        res.status(401).send('You are not authorized to access this content')
    }
}

function otherMiddleware(req, res, next) {
    console.log('More MW operations..')
    next()
}


module.exports = { isAuth, otherMiddleware } 
