import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardHeader from '../dashboard/DashboardHeader/DashboardHeader'
import EditProfile from './EditProfile'
import UserProfileNav from './UserProfileNav'
import InviteFriends from './InviteFriends'
import Notifications from './Notifications'
import Security from './Security'
import Help from './Help'
import TransacHistory from './TransacHistory'
import SelectAvatar from './SelectAvatar'


export default function UserProfile({ app_navigateTo, userLogout }){
    return (
        <div style={{ minHeight: '100vh' }} className='dashboard'>
            <DashboardHeader />

            <div className='p-4'>
                <div className='d-flex flex-wrap justify-content-between col-lg-12 w-100 col-12'>
                    <div className="col-lg-3 col-md-3 col-12">
                        <UserProfileNav userLogout={userLogout} />
                    </div>
                    <div className='col-lg-9 col-md-9 col-12 px-lg-5 px-md-5 px-2'>
                        <Routes>
                            <Route 
                                path='' 
                                element={
                                    <EditProfile />
                                }    
                            />

                            <Route 
                                path='select-avatar' 
                                element={
                                    <SelectAvatar isProfileRoute={true} />
                                }    
                            />                            

                            <Route 
                                path='invite-friends' 
                                element={
                                    <InviteFriends />
                                }    
                            />

                            <Route 
                                path='notifications' 
                                element={
                                    <Notifications />
                                }    
                            />

                            <Route 
                                path='transaction-history' 
                                element={
                                    <TransacHistory />
                                }    
                            />

                            <Route 
                                path='security' 
                                element={
                                    <Security />
                                }    
                            />
                            <Route 
                                path='help' 
                                element={
                                    <Help />
                                }    
                            />                                                                                    
                        </Routes>
                    </div>
                </div>
            </div>            
        </div>        
    )
}