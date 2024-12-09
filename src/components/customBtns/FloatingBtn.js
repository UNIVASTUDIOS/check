import React from "react";
import './css/customBtn.css'
import CustomSvg from "../svgs/CustomSvg";
import { FaUsers } from "react-icons/fa6";
import { CgMenuLeftAlt } from "react-icons/cg";
import { IoChatbubbles } from "react-icons/io5";
import { LuUserCog } from "react-icons/lu";



export default function FloatingBtn({ icon, btnFunc }){

    const onClickBtn = () => btnFunc ? btnFunc() : null

    return (
        <div className="d-flex align-items-center justify-content-end">
            <div
                onClick={onClickBtn} 
                className="floating-btn-conainer p-3 rounded-circle clickable"
            >
                {
                    icon == "allUsers"
                    ?
                        <FaUsers color="#FFF" size={30} /> 
                    :
                    icon == "chat"
                    ?
                        <IoChatbubbles color="#FFF" size={30} /> 
                    :
                    icon == "profile"
                    ?
                        <LuUserCog color="#FFF" size={30} />      
                    : 
                    icon == 'leftMenu'
                    ?
                        <CgMenuLeftAlt color="#FFF" size={30} />            
                    :
                        <></>
                }
            </div>
        </div>
    )
}