import React from "react";
import '../css/chat.css'
import userProfile1 from '../../../assets/images/userProfile1.png'
import userProfile2 from '../../../assets/images/userProfile2.png'
import userProfile3 from '../../../assets/images/userProfile3.png'
import userProfile4 from '../../../assets/images/userProfile4.png'
import userProfile5 from '../../../assets/images/userProfile5.png'
import userProfile6 from '../../../assets/images/userProfile6.png'



const users = [
    {
        name: 'SteshaCr',
        wins: 230,
        profile: userProfile1,
        bgClass: 'bg-FD8D84',
        category: 'wins',
        email: 'steshacr@gmail.com',
        country: 'Nigeria',
        favGame: 'Chess',
        bio: `I'm SteshaCr, hailing from Lagos, Nigeria, where I've carved a niche for myself in the gaming world. My journey began with a love for strategic classics like Chess and Ludo, which not only honed my tactical abilities but also opened doors to a vibrant, global gaming community. As I climbed the ranks in local tournaments, my belief in gaming as a bridge between cultures has only strengthened. I'm committed to mastering my skills further and making an impact in Nigeria's competitive gaming landscape.`
    },
    {
        name: 'JosephX',
        wins: 300,
        profile: userProfile2,
        bgClass: 'bg-84FDA6',
        category: 'wins',
        email: 'josephx@gmail.com',
        country: 'Nigeria',
        favGame: 'Scrabble',
        bio: `I'm JosephX, hailing from Lagos, Nigeria, where I've carved a niche for myself in the gaming world. My journey began with a love for strategic classics like Chess and Ludo, which not only honed my tactical abilities but also opened doors to a vibrant, global gaming community. As I climbed the ranks in local tournaments, my belief in gaming as a bridge between cultures has only strengthened. I'm committed to mastering my skills further and making an impact in Nigeria's competitive gaming landscape.`
    },
    {
        name: 'DaniX',
        wins: 150,
        profile: userProfile3,
        bgClass: 'bg-B1DEFF',
        category: 'wins',
        email: 'danix@gmail.com',
        country: 'Nigeria',
        favGame: 'Ludo',
        bio: `I'm DaniX, hailing from Lagos, Nigeria, where I've carved a niche for myself in the gaming world. My journey began with a love for strategic classics like Chess and Ludo, which not only honed my tactical abilities but also opened doors to a vibrant, global gaming community. As I climbed the ranks in local tournaments, my belief in gaming as a bridge between cultures has only strengthened. I'm committed to mastering my skills further and making an impact in Nigeria's competitive gaming landscape.`
    },
    {
        name: 'Clar8',
        wins: 20,
        profile: userProfile4,
        bgClass: 'bg-C59AFC',
        category: 'new',
        email: 'clar8@gmail.com',
        country: 'Nigeria',
        favGame: 'Chess',
        bio: `I'm Clar8, hailing from Lagos, Nigeria, where I've carved a niche for myself in the gaming world. My journey began with a love for strategic classics like Chess and Ludo, which not only honed my tactical abilities but also opened doors to a vibrant, global gaming community. As I climbed the ranks in local tournaments, my belief in gaming as a bridge between cultures has only strengthened. I'm committed to mastering my skills further and making an impact in Nigeria's competitive gaming landscape.`
    },
]



export default function ChatUsers({ selectActiveChat, activeChat, closeUsersOffcanvas }){

    const displayUsers = users.map((user, i) => {
        const { profile, name, bgClass } = user

        const onUserClick = () => {
            selectActiveChat(user)
            
            return closeUsersOffcanvas && closeUsersOffcanvas()
        }

        const isActive = activeChat && activeChat.name.toLowerCase() == name.toLowerCase()

        return (
            <div
                key={i}
                onClick={onUserClick}
                className={`${isActive ? 'bg-BD3193' : 'bg-transparent'} chat-chat-single-user-container p-3 d-flex align-items-center mb-3 clickable`}
            >
                <div className={`${bgClass} rounded-circle d-flex align-items-center justify-content-center p-1 col-lg-2 col-md-2 col-2`}>
                    <img src={profile} className="col-lg-12 col-md-12 col-12" />
                </div>

                <p className="m-0 p-0 small-txt font-weight-600 txt-FFF font-family-poppins mx-4">{name}</p>
            </div>
        )
    })

    return (
        <div className="chat-chat-users-container p-4">
            { displayUsers }
        </div>
    )
}