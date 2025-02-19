import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostsResponseData } from "../../../types/api";
import { RootState } from "../store";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const feedApi = createApi({
  reducerPath: 'feedApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }, 
  }),
  endpoints: (builder) => ({
    getPostsFromSubreddits: builder.query<PostsResponseData, { subreddits: string[], sort: string, params?: Record<string, string>}>({
      query: ({subreddits, sort, params}) => {
        const queryString = new URLSearchParams(params || {}).toString();
        const subredditList = subreddits.join("+");
        return `/r/${subredditList}/${sort}.json?${queryString}&raw_json=1`;
      }
    }),
  }),
});

  
export const { useGetPostsFromSubredditsQuery } = feedApi;
