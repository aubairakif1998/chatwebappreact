import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import User, { IUser } from '../models/User'; // Adjust the path if necessary

const router = express.Router();

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your actual secret

// Sign-Up Route
router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password } = req.body;

    // Check if user already exists
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await argon2.hash(password);

    // Create a new user
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
});
 
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password matches
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
});

export default router;
