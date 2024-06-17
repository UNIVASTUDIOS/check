
import { useState } from "react";
import CustomSvg from "../../svgs/CustomSvg";
import '../css/games.css'



export default function DisplayUsers({ users, btnTxt, btnFunc }){
    const [hoveredUser, setHoveredUser] = useState()

    const displayUsers = users.map((user, i) => {
        const { name, bgClass, wins, profile } = user
        
        const onMouseOver = (e) => setHoveredUser(name)
        const onMouseLeave = () => setHoveredUser('')

        const onClickUser = () => btnFunc ? btnFunc(user) : null

        const isHovered = hoveredUser == name ? true : false 

        return (
            <div
                key={i}
                className={`d-flex align-items-center justify-content-between mb-3`}
            >
                <div className="col-lg-4 col-md-4 col-4 d-flex align-items-center">
                    <div className={`${bgClass} col-lg-4 col-md-4 col-6 rounded-circle d-flex align-items-center justify-content-center p-1`}>
                        <img src={profile} className="col-lg-12 col-md-12 col-12" />
                    </div>
                    <div className="mx-3">
                        <p className="m-0 p-0 mb-2 small-txt font-family-poppins txt-FFF font-weight-600">{name}</p>
                        <p className="m-0 p-0 extra-small-txt font-family-poppins txt-FBBC04 font-weight-300">{wins} wins</p>
                    </div>
                </div>
                <button
                    onClick={onClickUser} 
                    onMouseOver={onMouseOver}
                    onMouseLeave={onMouseLeave}
                    className='col-lg-3 col-md-3 col-4 active-users-share-btn create-lobby-join-btn d-flex align-items-center justify-content-center p-3'
                >
                    <p className={`${isHovered ? 'txt-000' : 'txt-FFF'} p-0 m-0 text-capitalize small-txt font-weight-500 font-family-poppins mx-1`}>
                        {
                            btnTxt ? btnTxt : 'Select'
                        }
                    </p>
                    <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                        <CustomSvg name={'arrow-right'} color={isHovered ? '#000' : '#FFF'}  />
                    </div>
                </button>                
            </div>
        )
    })

    return (
        <div>
            { displayUsers }
        </div>
    )
}