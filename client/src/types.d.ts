interface BaseSchema {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

interface ILoginUser {
  name?: string;
  email: string;
  password: string;
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  blocked?: string;
}

interface IReply {
  author: mongoose.Schema.Types.ObjectId | string;
  content: string;
}

interface ILike {
  likes: mongoose.Schema.Types.ObjectId | string;
}

interface IDiscussion extends BaseSchema {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId | string;
  replies: IReply[];
  likes: ILike[];
  closed: boolean;
}

interface IReply {
  _id: string;
  author: string;
  content: string;
}