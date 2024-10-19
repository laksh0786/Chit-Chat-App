export const sampleChats = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Doe",
        _id: "1",
        groupChat: false,
        members: ["1", "2", "3"],
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png",
            "https://www.w3schools.com/howto/img_avatar.png",
        ],
        name: "lakshay",
        _id: "2",
        groupChat: true,
        members: ["1", "2"],

    },

]

export const sampleUsers = [
    {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "John Doe",
        _id: "1"
    },
    {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "lakshay",
        _id: "2"
    },
]

export const sampleNotifications = [
    {
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "John Doe",
        },
        _id:1
    },
    {
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "lakshay",
        },
        _id:2
    }

]


export const sampleMessages = [
    {
        
        content:"Hey everyone how do you do??",
        _id:"shhsuhsuhsjbbvbybdyb",
        sender:{
            _id:"user._id",
            name:"John Doe",
        },
        chat:"chatId",
        createdAt:"2021-10-10T10:10:10.000Z"
    },
    {
        attachments:[
            {
                public_id:"asdsad",
                url:"https://www.w3schools.com/howto/img_avatar.png"
            }
        ],

        content:"",
        _id:"shhsuhsuhsjbbvbynininbdyb",
        sender:{
            _id:"ndnbdwubqpspokpkds",
            name:"Lakshay",
        },
        chat:"chatId",
        createdAt:"2021-10-10T10:10:10.000Z"
    },
]