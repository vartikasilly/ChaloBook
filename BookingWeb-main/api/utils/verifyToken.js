import jwt from 'jsonwebtoken'
import { createError } from './error.js'
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) {
      return next(createError(401, "You are not authenticated!"));
    }
  
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = user;
      console.log('till here');
      next();
    });
  };
  export const verifyUser = (req, res, next) => {
    //console.log('till here');
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        //console.log('till here');
        next();
      } else {
        console.log('till here');
        return next(createError(403, "You are not authorized!"));
      }
    });
  };
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res,  () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };