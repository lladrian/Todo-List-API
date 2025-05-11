import jwt from 'jsonwebtoken';

const JWT_SECRET = 'test'; // Replace with your own secret key

export const generateAccessToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET, {
    expiresIn: '7w',
  });
};

export const verifyAccessToken = (token) => jwt.verify(token, JWT_SECRET);



