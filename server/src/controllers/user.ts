import express, { Request, Response } from 'express';
import { Discussion } from '../models/discussion';
import { User } from '../models/user';



export const myDiscussion = async (req: Request, res: Response) => {
  try{
    const userId = req.user?._id
    console.log('mydiscussion', userId);
    if(!userId)
      return res.status(404).json({message: 'user not found'})

    const discussions = await Discussion.find({author: userId})
    if(!discussions) 
      return res.status(404).json({message: 'discussion not found'})

    res.status(200).json(discussions)
  }
  catch (err: unknown) {
    console.log('error in fetching my discussion');
    res.status(500).json({message: err})
  }
}


export const allDiscussion = async (req: Request, res: Response) => {
  try{
    console.log('all discussion');
    const discussions = await Discussion.find()
    if(!discussions) 
      return res.status(404).json({message: 'discussion not found'})

    res.status(200).json(discussions)
  }
  catch (err: unknown) {
    console.log('error in fetching all discussion');
    res.status(500).json({message: err})
  }
}


export const getDiscussionById = async (req: Request, res: Response) => {
  try{
    const {discussionId} = req.params
    console.log('all discussion');
    const discussions = await Discussion.findById(discussionId)
    if(!discussions) 
      return res.status(404).json({message: 'discussion not found'})

    res.status(200).json(discussions)
  }
  catch (err: unknown) {
    console.log('error in fetching discussion by id');
    res.status(500).json({message: err})
  }
}


export const getUserByID = async (req: Request, res: Response) => {
  try{
    const {userId} = req.params 
    console.log('getUserByID', userId);
    
    const user = await User.findById(userId).select('-password')
    if(!user) 
      return res.status(404).json({message: 'user not found'})

    res.status(200).json(user)
  }
  catch (err: unknown) {
    console.log('error in creating new discussion');
    res.status(500).json({message: err})
  }
}

