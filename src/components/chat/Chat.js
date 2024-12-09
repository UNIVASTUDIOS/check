import React, { useRef, useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import ChatUsers from "./auxiliary/ChatUsers";
import FloatingBtn from "../customBtns/FloatingBtn";
import { Offcanvas } from 'react-bootstrap'
import ChatRoom from "./auxiliary/ChatRoom";
import CustomSvg from "../svgs/CustomSvg";


export default function Chat(){

    const [activeChat, setActiveChat] = useState()
    const [showUsersOffcanvas, setShowUsersOffcanvas] = useState(false)

    const selectActiveChat = user => setActiveChat(user)

    const openUsersOffcanvas = () => setShowUsersOffcanvas(true)
    const closeUsersOffcanvas = () => setShowUsersOffcanvas(false)

    const toggleUsersOffcanvas = () => setShowUsersOffcanvas(prev => !prev)

    return (
        <div style={{ minHeight: '100vh' }} className='dashboard'>
            <DashboardHeader />

            <div className="p-4 d-flex justify-content-between">
                <div className="col-lg-3 d-lg-block d-md-block d-none">
                    <ChatUsers 
                        selectActiveChat={selectActiveChat}
                        activeChat={activeChat}
                    />
                </div>
                <div className="col-lg-9 col-md-9 col-12 px-lg-4 px-md-4 px-0">
                    <ChatRoom 
                        activeChat={activeChat}
                    />
                </div>
            </div>

            <div className="d-lg-none d-md-none d-block w-100">
                <FloatingBtn icon="allUsers" btnFunc={toggleUsersOffcanvas} />
            </div>

            <Offcanvas show={showUsersOffcanvas}>
                <div style={{ backgroundColor: '#130828', overflowY: 'auto', maxHeight: '100vh' }} className='navContainer w-100 h-100'>
                    <div className='w-100 h-100 navContainer'>
                        <div className='d-flex align-items-center p-4 mb-5 justify-content-between'>
                            <h1 className='m-0 p-0 font-weight-700 font-family-quantico txt-large txt-FFF'>User <span className='create-lobby-title-span'>Chats</span></h1>               
                            <div onClick={closeUsersOffcanvas} className='clickable'>
                                <CustomSvg name="x" color="#FFF" />
                            </div>                     
                        </div>   

                        <ChatUsers 
                            selectActiveChat={selectActiveChat}
                            activeChat={activeChat}
                            closeUsersOffcanvas={closeUsersOffcanvas}
                        />                                            
                    </div>             
                </div>
            </Offcanvas>
        </div>
    )
}