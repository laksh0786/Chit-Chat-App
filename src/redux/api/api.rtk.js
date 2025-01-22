//we are using RTK Query to fetch data from the API
//RTK Query is a powerful data fetching and caching tool built on top of the Redux Toolkit. It is designed to simplify common cases for loading data in a web application, including data fetching, caching, and invalidation.
//we can also make optimistic updates, polling, and pagination with RTK Query.

//using RTK Query, we can create a new API slice that will handle all the API requests and responses for us.
//We can define the endpoints we want to fetch data from, and RTK Query will automatically generate the necessary actions, reducers, and hooks to interact with those endpoints.
//In this file, we define an API slice using the createApi function from RTK Query. We define an endpoint for fetching the data from the API and export the generated API slice.
//Using builder.query, we define an endpoint for fetching the data from the API. and using builder.mutation, we define an endpoint for sending data to the API.

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { server } from "../../constants/config"


const api = createApi({

    //the name of the API slice that will be used to generate the actions, reducers, and hooks like the name of the slice
    reducerPath: "api",

    //the base query function that will be used to make the API requests it takes an object with the baseUrl property that specifies the base URL of the API that we want to fetch data from.
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1`
    }),

    //in rtk query data is cached by default and on updating the data the data is not updated so we provide tagTypes to invalidate the cache. tagTypes is an array of strings that define the types of tags that we want to invalidate when the data is updated. in simple words, when the data is updated, the cache is invalidated and the data is refetched from the API.
    tagTypes: ["Chat", "User", "Message"],

    //the endpoints that we want to fetch data from. We define an endpoint for fetching the data from the API by providing the name of the endpoint and the URL of the endpoint.
    endpoints: (builder) => ({

        myChats: builder.query({

            //query is a function that takes an object with the url property that specifies the URL of the endpoint that we want to fetch data from. We can also provide other options like credentials, headers, and other options that are supported by the fetch API.
            query: () => ({
                url: `/chat/get-my-chats`,
                credentials: "include"  //this is used to include the cookies in the request
            }),

            providesTags: ["Chat"] //this is used to invalidate the cache when the data is updated
            // keepUnusedDataFor: 0 //this will remove the data from the cache after 0 seconds i.e no caching
        }),

        //search users endpoint to search users by name and includes pagination
        searchUsers: builder.query({

            query: ({ name, page = 1 }) => {
                return {
                    url: `/user/search-user?name=${name}&page=${page}`,
                    credentials: "include"
                }
            },

            providesTags: ["User"]

        }),


        //send friend request mutation to send a friend request to a user
        sendFriendRequest: builder.mutation({
            query: (data) => {
                return {
                    url: "/user/send-friend-request",
                    method: "PUT",
                    credentials: "include",
                    body: data
                }
            },

            invalidatesTags: ["User"]

        }),

        getNotifications: builder.query({
            query: () => {
                return {
                    url: "/user/notifications",
                    credentials: "include"
                }
            },
            keepUnusedDataFor: 0 //this will remove the data from the cache after 0 seconds i.e no caching
        }),

        acceptFriendRequest: builder.mutation({

            query: (data) => {
                return {
                    url: "/user/accept-friend-request",
                    method: 'PUT',
                    credentials: "include",
                    body: data
                }
            },
            invalidatesTags: ["Chat"]
        }),

        getChatDetails: builder.query({

            query: ({ chatId, populate = false }) => {

                let url = `/chat/${chatId}`

                if (populate) url += '?populate=true'

                return {
                    url: url,
                    credentials: "include"
                }

            },

            providesTags: ["Chat"]

        }),

        getChatMessages: builder.query({

            query: ({ chatId, page }) => ({
                url: `/chat/messages/${chatId}?page=${page}`,
                credentials: "include"
            }),
            keepUnusedDataFor: 0,
        }),

        sendAttachments: builder.mutation({

            query: (data) => {
                return ({
                    url: '/chat/send-attachments',
                    method: 'POST',
                    credentials: "include",
                    body: data
                })
            }

        }),

        getMyGroups: builder.query({

            query: () => ({
                url: '/chat/get-my-chats/groups',
                credentials: "include"
            }),

            providesTags: ["Chat"]

        }),

        availableFriends: builder.query({

            query: (chatId) => {

                let url = '/user/friends'

                if(chatId){
                    url += `?chatId=${chatId}`
                }

                return ({
                    url,
                    credentials: "include"
                })

            },
            keepUnusedDataFor: 0
        }),

        createGroup : builder.mutation({

            query: ({name , members})=>({

                url : '/chat/new-group-chat',
                credentials: "include",
                method: 'POST',
                body: {name , members}

            }),

            invalidatesTags: ["Chat"]

        }),

        renameGroup : builder.mutation({
            
            query : ({chatId , name})=>{
                return ({
                    url : `/chat/${chatId}`,
                    method:'PUT',
                    credentials : "include",
                    body : {name}
                })
            },

            invalidatesTags:["Chat"]

        }),

        addGroupMembers : builder.mutation({
            
            query : ({chatId , members})=>({
                url : "/chat/add-group-members",
                method : "PUT",
                credentials : "include",
                body : {chatId , members}
            }),
            
            invalidatesTags:["Chat"]
        }),

        removeGroupMember : builder.mutation({
            query:({chatId , userId})=>({
                url : "/chat/remove-group-member",
                method : "PUT",
                credentials : "include",
                body : {chatId , userId}
            }),
            invalidatesTags:["Chat"]
        }),

        deleteChat : builder.mutation({

            query: (chatId)=>({
                url : `/chat/${chatId}`,
                method:"DELETE",
                credentials : "include"
            }),

            invalidatesTags:["Chat"]

        }),

        leaveGroup : builder.mutation({

            query: (chatId) => ({
                url : `/chat/leave-group-chat/${chatId}`,
                method : "DELETE",
                credentials : "include"
            }),

            invalidatesTags:["Chat"]
        }),

        getDashboardStats : builder.query({

            query: ()=>({
                url: '/admin/stats',
                credentials: "include"
            }),

            //keepUnusedDataFor is used to remove the data from the cache after 0 seconds i.e no caching
            keepUnusedDataFor: 0
        }),


        getAdminUserData : builder.query({

            query: ()=>({
                url: '/admin/users',
                credentials: "include"
            }),
            keepUnusedDataFor: 0
        
        })

    })

})


export default api;

//there are two hook : useMyChatsQuery and UseLazyMyChatsQuery, the difference between them is that useMyChatsQuery will fetch the data from the API when the component is rendered, while UseLazyMyChatsQuery will fetch the data from the API when the fetch function is called or triggered.


export const {
    useMyChatsQuery,
    useLazySearchUsersQuery,
    useSendFriendRequestMutation,
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
    useGetChatDetailsQuery,
    useGetChatMessagesQuery,
    useSendAttachmentsMutation,
    useGetMyGroupsQuery,
    useAvailableFriendsQuery,
    useCreateGroupMutation,
    useRenameGroupMutation,
    useAddGroupMembersMutation,
    useRemoveGroupMemberMutation,
    useDeleteChatMutation,
    useLeaveGroupMutation,
    useGetDashboardStatsQuery,
    useGetAdminUserDataQuery
} = api