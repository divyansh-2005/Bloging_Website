const { validateToken } = require("../services/authentication");
const User = require('../models/user')

function checkForAuthenticationCookie(cookieName) {
    return async(req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            // No token, proceed to the next middleware without error
            return next();
        }

        try {
            // Validate the token only if it exists
            const userPayload = validateToken(tokenCookieValue);
           req.user = userPayload;            
        } catch (error) {
            // If there's an error validating the token, pass it to the error handler
            return next(error);
        }

        next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
