import React, { useState } from "react";
import DisplayUsers from "../games/auxiliary/DisplayUsers";
import userProfile1 from '../../assets/images/userProfile1.png'
import userProfile2 from '../../assets/images/userProfile2.png'
import userProfile3 from '../../assets/images/userProfile3.png'
import userProfile4 from '../../assets/images/userProfile4.png'
import userProfile5 from '../../assets/images/userProfile5.png'
import userProfile6 from '../../assets/images/userProfile6.png'
import ShareModal from "../games/auxiliary/ShareModal";


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
    {
        name: 'James Dan',
        wins: 100,
        profile: userProfile5,
        bgClass: 'bg-FFD2B1',
        category: 'old',
        email: 'jamesdan@gmail.com',
        country: 'Nigeria',
        favGame: 'Scrabble',
        bio: `I'm James Dan, hailing from Lagos, Nigeria, where I've carved a niche for myself in the gaming world. My journey began with a love for strategic classics like Chess and Ludo, which not only honed my tactical abilities but also opened doors to a vibrant, global gaming community. As I climbed the ranks in local tournaments, my belief in gaming as a bridge between cultures has only strengthened. I'm committed to mastering my skills further and making an impact in Nigeria's competitive gaming landscape.`        
    },
    {
        name: 'Diamond',
        wins: 60,
        profile: userProfile6,
        bgClass: 'bg-C5F8FF',
        category: 'rookies',
        email: 'diamond@gmail.com',
        country: 'Nigeria',
        favGame: 'Ludo',
        bio: `I'm Diamond, hailing from Lagos, Nigeria, where I've carved a niche for myself in the gaming world. My journey began with a love for strategic classics like Chess and Ludo, which not only honed my tactical abilities but also opened doors to a vibrant, global gaming community. As I climbed the ranks in local tournaments, my belief in gaming as a bridge between cultures has only strengthened. I'm committed to mastering my skills further and making an impact in Nigeria's competitive gaming landscape.`
    },
]



export default function InviteFriends(){

    const [shareModal, setShareModal] = useState({ visible: false, onHide: null, size: 'md' })

    const openShareModal = () => setShareModal({ visible: true, onHide: hideShareModal, size: 'md'})
    const hideShareModal = () => setShareModal({ visible: false, onHide: null, size: 'md'})

    return (
        <div className='dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2'>
            <DisplayUsers 
                users={users}
                btnTxt={"Invite"}
                btnFunc={openShareModal}
            />

            <ShareModal modalProps={shareModal} />
        </div>
    )
}