module.exports = function (req, res, next) {
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error', 'Please login')
        res.redirect('/signin')
    }