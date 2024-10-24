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
        attachments: [],   
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


export const dashboardData = {

    users:[
        {
            name:"John Doe",
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
            _id:"1",
            email:"john@gmail.com",
            friends:10,
            groups:2
        },
        {
            name:"Lakshay",
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
            _id:"2",
            email:"lakshay@gmail.com",
            friends:30,
            groups:8
        },
        {
            name:"Ujjwal Bansal",
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
            _id:"3",
            email:"ujjwal@gmail.com",
            friends:20,
            groups:5
        }
    ],

    chats:[
        {
            name:"John Doe",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            _id:"1",
            groupChat:false,
            members:[{_id:1 , avatar:"https://www.w3schools.com/howto/img_avatar.png"},{_id:2 , avatar:"https://www.w3schools.com/howto/img_avatar.png"},{_id:3 , avatar:"https://www.w3schools.com/howto/img_avatar.png"}],
            totalMessages:10,
            totalMembers:3,
            creator:{
                name:"John Doe",
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
            }
        },
        {
            name:"Lakshay Group",
            avatar:["https://www.w3schools.com/howto/img_avatar.png","https://www.w3schools.com/howto/img_avatar.png"],
            _id:"2",
            groupChat:true,
            members:[{_id:1 , avatar:"https://www.w3schools.com/howto/img_avatar.png"},{_id:2 , avatar:"https://www.w3schools.com/howto/img_avatar.png"}],
            totalMessages:20,
            totalMembers:2,
            creator:{
                name:"Lakshay",
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
            }
        }
    ] , 

    messages:[
        {
            attachments:[],
            content:"Hey everyone how do you do??",
            _id:"shhsuhsuhsjbbvbybdyb",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"John Doe",
            },
            groupChat:false,
            chat:"chatId",
            createdAt:"2024-10-10T10:10:10.000Z"
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
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name:"Lakshay",
            },
            groupChat:true,
            chat:"chatId",
            createdAt:"2021-10-10T10:10:10.000Z"
        }
    ]
}