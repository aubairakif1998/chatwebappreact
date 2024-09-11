import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key'; // Ensure this matches the key used in sign-in

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string };
}

// JWT Verification Middleware
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (token == null) return res.sendStatus(401); // If no token, respond with 401

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token invalid, respond with 403

    // Ensure the user object has the expected properties
    if (typeof user === 'object' && user !== null && 'id' in user && 'email' in user) {
      req.user = user as { id: string; email: string }; // Add user data to request
    } else {
      return res.sendStatus(403); // If user object is not valid, respond with 403
    }

    next();
  });
};

export default authenticateToken;
