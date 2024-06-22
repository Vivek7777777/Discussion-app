import express from 'express';
import { allUsers, blockUser, close } from '../controllers/admin';


const router = express.Router();

router.post('/close/:discussionId', close)
router.post('/block/:userId', blockUser)
router.post('/allUsers', allUsers)


export default router