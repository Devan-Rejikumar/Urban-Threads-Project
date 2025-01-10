// import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.adminToken;
//   console.log('Received token:', token);

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = decoded;
//     next();
//   } catch (error) {
//     console.error('Token verification error:', error);
//     return res.status(403).json({ message: 'Unauthorized: Invalid token' });
//   }
// };

// export default verifyToken;


// import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1] || req.cookies.adminToken;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = decoded;
//     next();
//   } catch (error) {
//     console.error('Token verification error:', error);
//     return res.status(403).json({ message: 'Unauthorized: Invalid token' });
//   }
// };

// export default verifyToken;


import jwt from 'jsonwebtoken';

 export const verifyToken = (req, res, next) => {
    try {

        const token = req.cookies.token || req.cookies.adminToken || req.headers.authorization?.split(' ')[1];
        console.log('Received token:', token);
        if (!token) {
            return res.status(401).json({ message: 'No token found' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
