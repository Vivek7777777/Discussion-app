import express, { Request, Response } from 'express';
import { Discussion } from '../models/discussion';



export const create = async (req: Request, res: Response) => {
  try{    
    const {title, content} = req.body
    console.log('create', req.body);
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }

    console.log(title, content);
    
    const discussion = new Discussion({
      title,
      content,
      author: req.user._id,
      likes: [],
      replies: []
    })
      
    const savedDiscussion = await discussion.save()
    res.status(201).json(savedDiscussion)
  }
  catch (err: unknown) {
    console.log('error in creating new discussion', err);
    res.status(500).json({message: err})
  }
}


//dis_id, aut_id, content
export const reply = async (req: Request, res: Response) => {
  try{
    console.log('reply');
    const {discussionId, content} = req.body
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }
    
    const discussion = await Discussion.findById(discussionId)
    if(!discussion) 
      return res.status(404).json({message: 'discussion not found'})

    if(discussion.closed)
      return res.status(404).json({message: 'discussion closed'})

    const newReply = {
      author: req.user._id,
      content
    }
    discussion.replies.push(newReply)

    const savedDiscussion = await discussion.save()
    res.status(200).json(savedDiscussion)
  }
  catch (err: unknown) {
    console.log('error in reply to discussion');
    res.status(500).json({message: err})
  }
}

//
export const like = async (req: Request, res: Response) => {
  try{
    console.log('like');
    const {discussionId} = req.params
    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: 'User not authenticated or invalid user data' });
    }

    const discussion = await Discussion.findById(discussionId)
    if(!discussion) 
      return res.status(404).json({message: 'discussion not found'})
    
    if (discussion.likes.includes(req.user._id)) 
      return res.status(400).json({ message: 'User already liked this discussion' });
    
    discussion.likes.push(req.user._id)

    const savedDiscussion = await discussion.save()
    res.status(200).json(savedDiscussion)
  }
  catch (err: unknown) {
    console.log('error in like a discussion');
    res.status(500).json({message: err})
  }
}



