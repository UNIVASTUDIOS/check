import React, { useEffect, useState } from 'react'
import logowithname from '../../../assets/images/logowithname.png';
import Profile from '../../../assets/images/Profile.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoMdMenu } from "react-icons/io";
import '../DashboardHeader/DashboardHeader.css';
import { Offcanvas } from 'react-bootstrap';
import CustomSvg from '../../svgs/CustomSvg';


const navLinks = [
    {
        name: 'home',
        path: '/'
    },
    {
        name: 'games',
        path: '/games'
    },
    {
        name: 'tournaments',
        path: '/tournaments'
    },
    {
        name: 'chat',
        path: '/chat'
    },
]


function DashboardHeader() {

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    
    const goToUserProfile = () => navigate('/user-profile')

    const pathname = useLocation().pathname

    const [showOffCanvasNav, setShowOffCanvasNav] = useState(false)
    const [activeNav, setActiveNav] = useState('home')


    useEffect(() => {
        if(pathname.toLowerCase().includes('chat')){
            setActiveNav('chat')
        
        } else if(pathname.toLowerCase().includes('tournaments')){
            setActiveNav('tournaments')

        } else if(pathname.toLowerCase().includes('games')){
            setActiveNav('games')

        } else{
            setActiveNav('home')
        }

    }, [pathname])


    const openOffCanvasNav = () => setShowOffCanvasNav(true)
    const closeOffCanvasNav = () => setShowOffCanvasNav(false)


    const displayNavLinks = navLinks.map((navLink, i) => {
        const { name, path } = navLink

        const onNavClick = () => navigateTo(path)

        const isActive = activeNav.toLowerCase() == name.toLowerCase()

        return (
            <p 
                key={i}
                onClick={onNavClick}
                className={`${isActive ? 'txt-BD3193' : 'txt-FFF'} clickable m-0 text-capitalize p-0 small-txt font-family-poppins navlinks mb-lg-0 mb-md-0 mb-3`}
            >
                { name }
            </p>            
        )
    })

  return (
    <div  style={{ backgroundColor: 'rgba(189, 49, 147, 0.20)' }} className='d-flex justify-content-between align-items-center px-lg-5 px-md-5 px-3 py-lg-3 py-md-3 py-3'>
        <div className='col-lg-1 col-md-1 col-4'>
            <div className='col-lg-11 col-md-11 col-7'>
                <img src={logowithname} className='col-lg-12 col-md-12 col-12' alt ="Our Logo"/>
            </div>
        </div>
        <div className='col-lg-5 navlinkscontainer d-lg-flex d-md-flex d-none justify-content-between'>
            { displayNavLinks }
        </div>
        <div onClick={goToUserProfile} className='clickable col-lg-1 d-lg-flex d-md-flex d-none'>
            <img src= {Profile} className='col-lg-12 profileimage' alt= "Profile"/>
        </div>
        <div onClick={openOffCanvasNav} className='clickable col-lg-1 d-lg-none d-md-none d-block'>
            <IoMdMenu size={30} color='#fff' />
        </div>

        <Offcanvas show={showOffCanvasNav}>
            <div style={{ backgroundColor: '#130828' }} className='w-100 h-100'>
                <div className='navContainer w-100 h-100 p-4'>
                    <div className='d-flex align-items-center mb-5 justify-content-between'>
                        <div className='col-3 d-flex'>
                            <img src={logowithname} className='col-12' alt ="Our Logo"/>
                        </div>   
                        <div onClick={closeOffCanvasNav} className='clickable'>
                            <CustomSvg name="x" color="#FFF" />
                        </div>                     
                    </div>

                    <div className='mb-5'>
                        { displayNavLinks }
                    </div>              

                    <div onClick={goToUserProfile} className='col-3 clickable'>
                        <img src= {Profile} className='col-12' alt= "Profile" />
                    </div>                      
                </div>
            </div>
        </Offcanvas>
    </div>
  )
}

export default DashboardHeader