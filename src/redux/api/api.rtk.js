//we are using RTK Query to fetch data from the API
//RTK Query is a powerful data fetching and caching tool built on top of the Redux Toolkit. It is designed to simplify common cases for loading data in a web application, including data fetching, caching, and invalidation.
//we can also make optimistic updates, polling, and pagination with RTK Query.

//using RTK Query, we can create a new API slice that will handle all the API requests and responses for us.
//We can define the endpoints we want to fetch data from, and RTK Query will automatically generate the necessary actions, reducers, and hooks to interact with those endpoints.
//In this file, we define an API slice using the createApi function from RTK Query. We define an endpoint for fetching the data from the API and export the generated API slice.

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
    tagTypes: ["Chat"],

    //the endpoints that we want to fetch data from. We define an endpoint for fetching the data from the API by providing the name of the endpoint and the URL of the endpoint.
    endpoints: (builder) => ({

        myChats: builder.query({

            //query is a function that takes an object with the url property that specifies the URL of the endpoint that we want to fetch data from. We can also provide other options like credentials, headers, and other options that are supported by the fetch API.
            query: () => ({
                url: `/chat/get-my-chats`,
                credentials: "include"
            }),

            //provideTags is an array that helps us to provide tags to particular fetches. In this case, we are providing the "Chat" tag to the fetch so that when the data is updated, the cache is invalidated and the data is refetched from the API. We use invalidateTags to invalidate the cache when the data is updated in the updateChat mutation or Api.
            providesTags: ["Chat"]

        })

    })

})


export default api;

//there are two hook : useMyChatsQuery and UseLazyMyChatsQuery, the difference between them is that useMyChatsQuery will fetch the data from the API when the component is rendered, while UseLazyMyChatsQuery will fetch the data from the API when the fetch function is called or triggered.


export const { useMyChatsQuery } = api