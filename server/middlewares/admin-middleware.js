const adminMiddleware = async(req, res, next)=>{
    try {
        const adminRole = req.User.isAdmin;
        if (!req.User.isAdmin) {
            return res.status(403).json({ msg: "Access denied" });
        }
        return next()
    } catch (error) {
        next(error)
    }
}

module.exports= adminMiddleware