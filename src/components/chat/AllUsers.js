import React, { useEffect, useRef, useState } from "react";
import './css/chat.css'
import CustomSvg from "../svgs/CustomSvg";
import userProfile1 from '../../assets/images/userProfile1.png'
import userProfile2 from '../../assets/images/userProfile2.png'
import userProfile3 from '../../assets/images/userProfile3.png'
import userProfile4 from '../../assets/images/userProfile4.png'
import userProfile5 from '../../assets/images/userProfile5.png'
import userProfile6 from '../../assets/images/userProfile6.png'
import DisplayUsers from "../games/auxiliary/DisplayUsers";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import { CSSTransition } from "react-transition-group";
import PlayerProfile from "./auxiliary/PlayerProfile";
import { IoArrowBackSharp } from "react-icons/io5";
import FloatingBtn from "../customBtns/FloatingBtn";
import { Offcanvas } from 'react-bootstrap'
import CollapseBlock from "../dashboard/CollapseBlockLeft/collapseblockleft";
import CollapseBlockRight from "../dashboard/collapseblockright/collapseblockright";


const categories = [
    {
        name: 'all'
    },
    {
        name: 'wins'
    },
    {
        name: 'male'
    },
    {
        name: 'female'
    },
    {
        name: 'new'
    },
    {
        name: 'old'
    },
    {
        name: 'rookies'
    },
]

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



export default function AllUsers(){

    const allUsers = useRef(users)
    const playerProfileNodeRef = useRef(null)

    const [showAllUsers, setShowAllUsers] = useState(true)
    const [activeCategory, setActiveCategory] = useState('all')
    const [filteredUsers, setFilteredUsers] = useState(users)
    const [searchFilter, setSearchFilter] = useState('')
    const [activePlayer, setActivePlayer] = useState()
    const [showOffcanvasMenu, setShowOffcanvasMenu] = useState(false)
    const [isLeftBlockOpen, setIsLeftBlockOpen] = useState(true)
    const [isRightBlockOpen, setIsRightBlockOpen] = useState(true)
    const [blocksOpen, setBlocksOpen] = useState('both')

    useEffect(() => {
        if(isLeftBlockOpen && isRightBlockOpen){
            setBlocksOpen('both')
        
        }

        if(!isLeftBlockOpen && !isRightBlockOpen){
            setBlocksOpen('none')
        }

        if((!isLeftBlockOpen && isRightBlockOpen) || (isLeftBlockOpen && !isRightBlockOpen)){
            setBlocksOpen('one')
        }
    }, [isLeftBlockOpen, isRightBlockOpen])

    useEffect(() => {
        if(activeCategory){

            setSearchFilter("")

            if(activeCategory == "all"){
                setFilteredUsers(allUsers.current)

            } else{
                const _filteredUsers = allUsers.current.filter(user => user.category.toLowerCase() == activeCategory.toLowerCase())
                setFilteredUsers(_filteredUsers)
            }
        }
    }, [activeCategory])


    useEffect(() => {

        if(activeCategory){
            const categoryFiltered = 
                activeCategory == 'all' 
                ?
                    allUsers.current
                :
                    allUsers.current.filter(user => user.category.toLowerCase() == activeCategory.toLowerCase())

            if(searchFilter){
                const _filteredUsers = categoryFiltered.filter(user => 
                    searchFilter.toLowerCase().includes(user.name.toLowerCase())
                    ||
                    user.name.toLowerCase().includes(searchFilter.toLowerCase())
                )
    
                setFilteredUsers(_filteredUsers)
            
            } else{
                setFilteredUsers(categoryFiltered)
            }
        }


    }, [searchFilter])

    useEffect(() => {
        if(showOffcanvasMenu){
            setSearchFilter('')
            setActiveCategory('all')
            setFilteredUsers(users)
        }
    }, [showOffcanvasMenu])

    const openOffcanvasMenu = () => setShowOffcanvasMenu(true)
    const closeOffcanvasMenu = () => setShowOffcanvasMenu(false)
    const toggleOffcanvasMenu = () => setShowOffcanvasMenu(prev => !prev)

    const onSearchFilterChange = (e) => setSearchFilter(e.target.value)

    const selectPlayer = (player) => setActivePlayer(player)
    const hideActivePlayer = () => setActivePlayer()


    const displayCategories = categories.map((category, i) => {
        const { name } = category

        const isActive = name == activeCategory ? true : false

        const selectCategory = () => {
            setActiveCategory(name)
        
            return closeOffcanvasMenu()
        }

        return (
            <div
                key={i} 
                onClick={selectCategory}
                className={`${isActive ? 'bg-BE3593' : 'bg-transparent'} mb-lg-0 mb-md-0 mb-3 col-lg-auto col-md-auto col-5 clickable chat-users-section-filter-container col-lg-1 d-flex align-items-center justify-content-center px-5 py-2`}
            >
                <p className={`${isActive ? 'txt-FFF' : 'txt-BD3193'} m-0 p-0 font-weight-600 font-family-poppins line-height-24 small-txt text-capitalize`}>{name}</p>
            </div> 
        )
    })


    return(
        <div style={{ minHeight: '100vh' }} className='dashboard'>
            <DashboardHeader />
            <div className='d-lg-flex d-md-flex d-block mt-lg-4 mt-md-4 mt-4 px-lg-4 px-md-4 px-4 align-items-start justify-content-between herogeneral'>

                <div className='d-lg-none d-md-none d-flex align-items-center justify-content-between mb-2'>
                    <div className='col-lg-2'>
                        <CollapseBlock isSmallScreen={true} />
                    </div>
                    <div className='col-lg-2'>
                        <CollapseBlockRight isSmallScreen={true }/>
                    </div>              
                </div>

                <div className={`${isLeftBlockOpen ? 'col-lg-2 col-md-2' : 'col-lg-1 col-md-1'} d-lg-flex d-md-flex d-none`}>
                    <CollapseBlock setIsLeftBlockOpen={setIsLeftBlockOpen} />
                </div>

                <div className={`${blocksOpen == 'both' ? 'col-lg-8 col-md-8' : blocksOpen == 'one' ? 'col-lg-9 col-md-9' : blocksOpen == 'none' ? 'col-lg-10 col-md-10' : ''} col-auto px-lg-4 px-md-4 px-0`}>
                    <div className=''>
                        {
                            showAllUsers &&
                                <div className="">
                                    <div className="mb-4 d-flex align-items-center justify-content-between chat-users-search-container p-2">
                                        <div style={{ width: '3%' }}>
                                            <CustomSvg name="search" />
                                        </div>
                                        <input
                                            style={{ width: '94%' }}
                                            placeholder='Search users'
                                            className='txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico'
                                            value={searchFilter}
                                            onInput={onSearchFilterChange}
                                        />                    
                                    </div>
                                    <div className="d-lg-flex d-md-flex d-none align-items-center justify-content-between mb-5"> 
                                        { displayCategories }                 
                                    </div>
                                    <div>
                                        <DisplayUsers users={filteredUsers} btnTxt={"View"} btnFunc={selectPlayer} />
                                    </div>
                                </div>                            
                        }

                        <CSSTransition
                            in={activePlayer ? true : false}
                            timeout={300}
                            classNames="alert"
                            unmountOnExit
                            nodeRef={playerProfileNodeRef}
                            onEnter={() => setShowAllUsers(false)}
                            onExited={() => setShowAllUsers(true)}
                        >
                            <div ref={playerProfileNodeRef}>
                                <button 
                                    onClick={hideActivePlayer}
                                    className='w-25 bg-transparent create-lobby-join-btn d-flex align-items-center justify-content-center p-2 mb-5'
                                >
                                    <div className='m-0 p-0 mx-1 d-flex align-items-center'>
                                        <IoArrowBackSharp  size={20} color='#fff' />
                                    </div>                                
                                    <p className='p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1'>Back</p>
                                </button>                                 
                                <PlayerProfile 
                                    player={activePlayer}
                                />
                            </div>
                        </CSSTransition>                      
                    </div>
                </div>

                <div className={`${isRightBlockOpen ? 'col-lg-2 col-md-2' : 'col-lg-1 col-md-1'} d-lg-flex d-md-flex d-none align-items-center justify-content-end`}>
                    <div className=''>
                        <CollapseBlockRight setIsRightBlockOpen={setIsRightBlockOpen} />
                    </div>
                </div>
            </div>

            <div className="d-lg-none d-md-none d-block w-100">
                <FloatingBtn icon="leftMenu" btnFunc={toggleOffcanvasMenu} />
            </div>

            <Offcanvas show={showOffcanvasMenu}>
                <div style={{ backgroundColor: '#130828', overflowY: 'auto', maxHeight: '100vh' }} className='navContainer w-100 h-100'>
                    <div className='w-100 h-100 navContainer p-4'>
                        <div className='d-flex align-items-center mb-5 justify-content-between'>
                            <h1 className='m-0 p-0 font-weight-700 font-family-quantico txt-large txt-FFF'>Filter <span className='create-lobby-title-span'>Users</span></h1>               
                            <div onClick={closeOffcanvasMenu} className='clickable'>
                                <CustomSvg name="x" color="#FFF" />
                            </div>                     
                        </div>   

                        <div className="">
                            <div className="mb-4 d-flex align-items-center justify-content-between chat-users-search-container p-2">
                                <div style={{ width: '3%' }}>
                                    <CustomSvg name="search" />
                                </div>
                                <input
                                    style={{ width: '94%' }}
                                    placeholder='Search users'
                                    className='txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico'
                                    value={searchFilter}
                                    onInput={onSearchFilterChange}
                                />                    
                            </div> 

                            <div className="d-flex flex-wrap align-items-center justify-content-between mb-5"> 
                                { displayCategories }                 
                            </div>    

                            <button 
                                onClick={closeOffcanvasMenu}
                                className='w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-5'
                            >
                                <div className='m-0 p-0 d-flex align-items-center'>
                                    <CustomSvg name={'search'} />
                                </div>                                
                                <p className='p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-2'>Search</p>
                            </button>                                                                           
                        </div>                     
                    </div>
                </div>
            </Offcanvas>
        </div>        
    )
}