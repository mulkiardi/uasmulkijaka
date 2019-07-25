module.exports.verivyToken = (req, res, next) => {
    const bearerHeader = req.headers['authentication'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken
        next();
    } else {
        res.sendStatus(403);
    }
}