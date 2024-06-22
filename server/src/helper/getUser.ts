import { IUser } from "../models/user"


export const getUser = (user: IUser) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}
