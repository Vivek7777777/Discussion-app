import express, { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User, UserRole } from '../models/user'


export const roleAuth = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction)=>{
    try{
      const cookie = req.cookies
      
      if (!cookie.token) 
        throw new Error('No cookie found');

      const token = cookie.token;
      if (typeof process.env.JWT_SECRET !== 'string') 
        throw new Error('JWT secret required');
      
      const verified = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
      console.log('middleware', verified);
      if(!verified) 
        throw new Error('Invalid token');

      const user = await User.findById(verified.userId);
      if(!user)
        throw new Error("user not found");
      // role===user.role || role.includes(user.role)
      if(!role.includes(user.role)){
        console.log(role, user.role);
        throw new Error('Role based error');
      } 
      if(user.blocked){
        throw new Error('Blocked User');
      }
      req.user = user
      next()
    }
    catch(err: unknown){
      next(err)
    }
  } 
}