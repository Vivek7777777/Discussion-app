import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { initDB } from './src/services/initDB';
import { IUser } from './src/models/user';
import authRoutes from './src/routes/auth';
import adminRoutes from './src/routes/admin';
import userRoutes from './src/routes/user';
import { roleAuth } from './src/middleware/roleAuth';

dotenv.config()

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


(async () => await initDB())();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

app.use('/auth', authRoutes)
app.use('/admin', roleAuth('ADMIN'), adminRoutes)
app.use('/user', roleAuth('USER-ADMIN'), userRoutes)


app.listen(3000, () =>{
  console.log('listening on http://localhost:3000');
  
})