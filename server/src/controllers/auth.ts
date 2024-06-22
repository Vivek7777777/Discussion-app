import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt, {JwtPayload} from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/user';
import { getUser } from '../helper/getUser';


dotenv.config()

export const register = async (req: Request, res: Response) => {
  try{
    const {name, email, password} = req.body
    
    const user = await User.findOne({email})
    if(user)  
      return res.status(409).json({message: 'Email registered as user'})
    
    // console.log('register');
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User ({
      name,
      email,
      password:  hashedPassword,
    })
    const savedUser = await newUser.save()
    console.log(savedUser);
    if(typeof process.env.JWT_SECRET !== 'string') 
      return res.status(400).json({message: 'jwt secret type error'})
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET)
    res.cookie('token', token, {httpOnly: true, secure: true})
    
    const returnUser = getUser(savedUser)
    
    res.status(201).json(returnUser)
  }
  catch{
    (err: unknown) => {
      console.log(err);
      res.status(500).json({message: 'error in registering user'})
    }
  }
}


export async function login (req: Request, res: Response){
  try{
    console.log('login');
    
    const {email, password} = req.body
    const user = await User.findOne({email})
    
    if(!user) 
      return res.status(404).json({message: 'user not found'})
    
    if(user.blocked) 
      return res.status(403).json({message: 'user is blocked'})
    
    if(user.password){
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) 
        return res.status(401).json({message: 'incorrect password'})
    }    
    user.password = ''

    console.log(user);
    if(typeof process.env.JWT_SECRET !== 'string') 
      return res.status(400).json({message: 'jwt secret type error'})
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    res.cookie('token', token, {httpOnly: true, secure: true})
    
    const returnUser = getUser(user)
    
    res.status(200).json(returnUser)
  }
  catch{(err: unknown) => {
    console.log(err);
    res.status(500).json({message: err})
  }}
}


export const logout = (req: Request, res: Response)=>{
  try{
    // console.log(req)
    res.clearCookie('token')
    res.status(200).json({message: 'user logged out'})
  } 
  catch{
    (err: unknown) => {
      console.log(err);
      res.status(500).json({message: err})
    }
  }
}


export const verifyAuth = async (req: Request, res: Response)=>{
  try{
    const cookie = req.cookies
    if(cookie.token === undefined) return res.json({message: "no cookie found", auth: false})
    
    const token = cookie.token
    if(typeof process.env.JWT_SECRET !== 'string') return res.status(400).json({message: 'jwt secret required', auth: false})
    
    const verified = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
    console.log('verifyAuth', verified);

    const checkUser = await User.findById(verified.userId)
    if(!checkUser){
      return res.json({message: "user deleted or disabled", auth: false})
    }
    
    if(!verified) return res.json({message: "invalid token", auth: false})
    const user = {
      _id: verified.userId,
      auth: true
    }
    
    res.status(200).json(user)
  }
  catch{
    (err: unknown) => {
      console.log(err);
      res.status(500).json({message: err, auth: false})
    }
  }
} 