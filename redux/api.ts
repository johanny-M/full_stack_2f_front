import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User{
    username: string,
    email: string

} 
interface UserResponse{
    user_id: string,
    username: string,
    email: string,
    created_at:string,
    updated_at: string                            
}
 interface Todo {
    id: string;
    user_id: string;
    title: string;
    description: string;
    status?: 'Pending' | 'Completed';
    created: string;
    updated: string;
  }
interface CreateTodo {
    user_id: string | null;
    title: string;
    description: string;
}

 interface TodosResponse {
    todos: Todo[];
    next_last_id: string;
  }

export const fakeApi = createApi({
    reducerPath: 'fakeApi',
    // baseQuery:  axiosBaseQuery(), 
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
        prepareHeaders: (headers) => {
                        // Set the 'Content-Type' header to 'application/json'
                        headers.set('Content-Type', 'application/json');
        }                                          
    }),
    tagTypes: ['User','Todo'],
    
    endpoints: (builder) => ({
    getTodos: builder.query<TodosResponse, number>({
    query: (pageSize=1) => `todos?pageSize=${pageSize}&sortOrder=desc`,
    providesTags: ['Todo'],
    }),
    createTodo: builder.mutation<Todo,CreateTodo>({
        query: (data) =>({
            url: "todo",
            method: "POST",
            body: data,
        }),
        invalidatesTags: ['Todo']
    }),
    createUser: builder.mutation<UserResponse,User>({
        query: (data)=>({
            url: "users",
            method: "POST",
            body: data

        }),
        invalidatesTags: ['User']
    }),
    }),
})

export const { useCreateUserMutation,useGetTodosQuery, useCreateTodoMutation } =fakeApi