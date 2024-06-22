import mongoose from "mongoose";
import { BaseSchema } from "../interface";


export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser extends BaseSchema {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  discussions: mongoose.Schema.Types.ObjectId[];
  blocked: boolean;
}

const userSchema= new mongoose.Schema<IUser>(
  {
    name: { 
      type: String, 
      required: true, 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: UserRole,
      default: UserRole.USER
    },
    discussions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Discussion' }],
    blocked: { 
      type: Boolean, 
      default: false 
    }
  },
  {timestamps: true}
);

export const User = mongoose.model<IUser> ('User', userSchema)