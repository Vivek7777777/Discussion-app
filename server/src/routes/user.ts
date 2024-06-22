import express from 'express';
import { allDiscussion, getDiscussionById, getUserByID, myDiscussion } from '../controllers/user';
import { create, like, reply } from '../controllers/discussion';


const router = express.Router();

router.post('/discussion', myDiscussion)
router.post('/allDiscussion', allDiscussion)
router.post('/discussion/:discussionId', getDiscussionById)
router.post('/create', create)
router.post('/reply', reply)
router.post('/like/:discussionId', like)
router.post('/:userId', getUserByID)


export default router