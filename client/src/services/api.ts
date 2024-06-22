import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useLinkClickHandler } from 'react-router-dom';

const backendUrl = 'http://localhost:3000';

interface IVerigyAuth {
  _id?: string;
  message?: string;
  auth: boolean;
}

interface IContent {
  title?: string,
  discussionId?: string,
  content: string
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: backendUrl }),
  endpoints: (builder) => ({
    //auth
    register: builder.mutation<IUser, ILoginUser>({
      query: (user) => ({
        url: `/auth/register`,
        method: 'POST',
        body: user,
        credentials: "include"
      })
    }),
    login: builder.mutation<IUser, ILoginUser>({
      query: (user) => ({
        url: `/auth/login`,
        method: 'POST',
        body: user,
        credentials: "include"
      })
    }),
    logout: builder.mutation<string, void>({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
        credentials: "include"
      })
    }),
    verifyAuth: builder.mutation<IVerigyAuth, void>({
      query: () => ({
        url: `/auth/verifyAuth`,
        method: 'POST',
        credentials: "include"
      })
    }),

    //user
    getDiscussions: builder.mutation<IDiscussion[], void>({
      query: () => ({
        url: `/user/allDiscussion`,
        method: 'POST',
        credentials: "include"
      })
    }),
    getDiscussionById: builder.mutation<IDiscussion, string>({
      query: (discussionId) => ({
        url: `/user/discussion/${discussionId}`,
        method: 'POST',
        credentials: "include"
      })
    }),
    getUserById: builder.mutation<IUser, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'POST',
        credentials: "include"
      })
    }),
    like: builder.mutation<IDiscussion, string>({
      query: (discussionId) => ({
        url: `/user/like/${discussionId}`,
        method: 'POST',
        credentials: "include"
      })
    }),
    reply: builder.mutation<IDiscussion, IContent>({
      query: (data) => ({
        url: `/user/reply`,
        method: 'POST',
        body: data,
        credentials: "include"
      })
    }),
    create: builder.mutation<IDiscussion, IContent>({
      query: (data) => ({
        url: `/user/create`,
        method: 'POST',
        body: data,
        credentials: "include"
      })
    }),
    getMyDiscussions: builder.mutation<IDiscussion[], void>({
      query: () => ({
        url: `/user/discussion`,
        method: 'POST',
        credentials: "include"
      })
    }),


    //admin
    getAllUsers: builder.mutation<IUser[], void>({
      query: () => ({
        url: `/admin/allUsers`,
        method: 'POST',
        credentials: "include"
      })
    }),
    block: builder.mutation<IUser[], string>({
      query: (userId) => ({
        url: `/admin/block/${userId}`,
        method: 'POST',
        credentials: "include"
      })
    }),
    close: builder.mutation<IDiscussion, string>({
      query: (discussionId) => ({
        url: `/admin/close/${discussionId}`,
        method: 'POST',
        credentials: "include"
      })
    }),
    
    
    
  }),
})


export const {
  //auth
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyAuthMutation,

  //user
  useGetDiscussionsMutation,
  useGetDiscussionByIdMutation,
  useGetUserByIdMutation,
  useLikeMutation,
  useReplyMutation,
  useCreateMutation,
  useGetMyDiscussionsMutation,

  //admin
  useGetAllUsersMutation,
  useBlockMutation,
  useCloseMutation,

  } = api