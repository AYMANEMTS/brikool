const getUserFromToken = require("../utils/getUserFromToken");

const checkAuthorization = (requiredPermission = "") => (req, res, next) => {
    try {
        const jwt = req.cookies['jwt'] || req.headers['authorization']?.split(' ')[1];
        const user = getUserFromToken(jwt);
        if (user.role === 'admin') {
            return next();
        }
        if (user.role === 'moderator') {
            if (user.permissions && user.permissions.includes(requiredPermission)) {
                return next();
            }
            return res.status(403).send('You do not have the required permission to access this action.');
        }
        return res.status(403).send('You do not have permission to access this action.');
    } catch (error) {
        return res.status(401).send('Unauthorized: Invalid or missing token.');
    }
};

module.exports = checkAuthorization;
