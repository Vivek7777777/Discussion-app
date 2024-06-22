import mongoose from "mongoose";
import { BaseSchema } from "../interface";


interface IReply {
  author: mongoose.Schema.Types.ObjectId | string;
  content: string;
}

interface ILike {
  likes: mongoose.Schema.Types.ObjectId | string;
}

export interface IDiscussion extends BaseSchema {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId | string;
  replies: IReply[];
  likes: ILike[];
  closed: boolean;
}

const discussionSchema = new mongoose.Schema<IDiscussion>(
  {
    title: { 
      type: String, 
      required: true 
    },
    content: {
      type: String, 
      required: true 
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    replies: [{
      author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
      },
      content: { 
        type: String, 
      }
    }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    closed: { 
      type: Boolean, 
      default: false 
    }
}, 
{ timestamps: true }
);

export const Discussion = mongoose.model<IDiscussion>('Discussion',discussionSchema);