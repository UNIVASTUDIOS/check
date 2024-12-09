import React from "react";
import CustomSvg from "../../svgs/CustomSvg";
import '../css/chat.css'
import ChatMsgs from "./ChatMsgs";


export default function ChatRoom({ activeChat }){
    return (
        <div className="h-100 w-100">
            {
                activeChat
                ?
                    <div className="m-0 p-0 w-100 h-100">
                        <div
                            className={`mb-4 chat-chat-room-active-chat-container p-2 d-flex align-items-center justify-content-start`}
                        >
                            <div className={`d-flex align-items-center justify-content-start`}>
                                <img src={activeChat.profile} className={`${activeChat.bgClass} p-2 rounded-circle col-lg-7 col-md-7 col-7`} />
                            </div>

                            <p className="m-0 p-0 small-txt font-weight-600 txt-FFF font-family-poppins">{activeChat.name}</p>
                        </div>

                        <div>
                            <ChatMsgs />
                        </div>                        
                    </div>
                :
                    <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                        <div className="mb-3">
                            <CustomSvg name="welcome-character" />  
                        </div>

                        <p className="m-0 p-0 mb-2 txt-BD3193 font-weight-600 regular-txt font-family-poppins text-center">User</p>
                        <p className="m-0 p-0 small-txt txt-FFF opacity-_7 font-family-poppins font-weight-400 text-center">Kindly select a chat to start messaging.</p>
                    </div>
            }
        </div>
    )
}