import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt, {JwtPayload} from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/user';
import { getUser } from '../helper/getUser';
import { Discussion } from '../models/discussion';



export const close = async (req: Request, res: Response) => {
  try{
    const {discussionId} = req.params

    const discussion = await Discussion.findById(discussionId)
    if(!discussion) 
      return res.status(404).json({message: 'discussion not found'})

    discussion.closed = true
    const savedDiscussion = await discussion.save()

    res.status(200).json(savedDiscussion)
  }
  catch (err: unknown) {
    console.log('error in closing a discussion');
    res.status(500).json({message: err})
  }
}


export const blockUser = async (req: Request, res: Response) => {
  try{
    const {userId} = req.params
    // const {discussionId} = req.body

    // const discussion = await Discussion.findById(discussionId)
    // if(!discussion) 
    //   return res.status(404).json({message: 'discussion not found'})

    // const user = await User.findById(discussion.author)
    const user = await User.findById(userId)
    if(!user) 
      return res.status(404).json({message: 'user not found'})

    user.blocked = true
    const savedUser = await user.save();
    
    res.status(200).json(savedUser)
  }
  catch (err: unknown) {
    console.log('error in blocking a user');
    res.status(500).json({message: err})
  }
}


export const allUsers = async (req: Request, res: Response) => {
  try{
    const users = await User.find({role: 'USER'}).select('_id name email role blocked')
    if(!users) 
      return res.status(404).json({message: 'user not found'})

    res.status(200).json(users)
  }
  catch (err: unknown) {
    console.log('error in fetching all users');
    res.status(500).json({message: err})
  }
}