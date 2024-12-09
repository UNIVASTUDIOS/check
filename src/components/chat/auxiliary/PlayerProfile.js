import React from "react";
import DashboardHeader from "../../dashboard/DashboardHeader/DashboardHeader";
import CustomSvg from "../../svgs/CustomSvg";


export default function PlayerProfile({ player }){

    if(player){

        const { profile, name, bio, wins, bgClass, category, email, country, favGame } = player

        return (
            <div>
                <h1 className='m-0 p-0 mb-4 font-weight-700 font-family-quantico txt-large txt-FFF'>Player <span className='create-lobby-title-span'>Profile</span></h1>                    

                <div className="d-flex align-items-center mb-5">
                    <div className={`${bgClass} rounded-circle d-flex align-items-center justify-content-center p-1`}>
                        <img src={profile} />
                    </div>                            
                    <div className="mx-2">
                        <h5 className="m-0 mb-1 p-0 txt-FFF font-family-poppins font-weight-600 regular-txt">{name}</h5>
                        <p className="m-0 p-0 mb-1 txt-FFF opacity-_7 small-txt font-family-poppins font-weight-300">{email}</p>
                        <p className="m-0 p-0 txt-FFF opacity-_7 small-txt font-family-poppins font-weight-300">{country}</p>
                    </div>
                </div>

                <h4 className="m-0 p-0 font-family-poppins small-txt font-weight-500 line-height-32 txt-FFF mb-3">Bio</h4>

                <p className="m-0 p-0 mb-4 font-family-poppins regular-txt txt-FFF font-weight-300 opacity-_7">{bio}</p>
            
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <div>
                        <h6 className="m-0 p-0 mb-3 txt-FFF font-family-poppins regular-txt line-height-32 font-weight-500">Favorite Game</h6>
                        <p className="m-0 p-0 text-capitalize txt-BD3193 small-txt font-weight-400 font-family-poppins">{favGame}</p>
                    </div>
                    <div>
                        <h6 className="m-0 p-0 mb-3 txt-FFF font-family-poppins regular-txt line-height-32 font-weight-500">Number of Wins</h6>
                        <p className="m-0 p-0 text-capitalize txt-BD3193 small-txt font-weight-400 font-family-poppins">{wins} wins</p>
                    </div>                    
                </div>

                <button 
                    // onClick={openActiveUsers}
                    className='w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-3'
                >
                    <p className='p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1 text-capitalize'>Chat {name}</p>
                    <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                        <CustomSvg name={'arrow-right'} />
                    </div>
                </button>

                <button 
                    // onClick={openActiveUsers}
                    className='w-100 chat-player-profile-play-btn bg-transparent d-flex align-items-center justify-content-center p-2 mb-3'
                >
                    <p className='p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1 text-capitalize'>Play {name}</p>
                    <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                        <CustomSvg name={'arrow-right'} />
                    </div>
                </button>                                 
            </div>
        )
    }

    return <></>
}
