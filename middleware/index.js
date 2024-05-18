const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token is required' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    try {
        // Decode the token payload
        const decoded = jwt.verify(token, 'jwttoken');
        req.user = decoded; // Attach the decoded payload to the request object
        next(); // Proceed to the next middleware
    } catch (err) {
        console.log(err)
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
