import React, { useState, useEffect } from 'react'
import CollapseBlockRight from '../../dashboard/collapseblockright/collapseblockright'
import CollapseBlock from '../../dashboard/CollapseBlockLeft/collapseblockleft'
import './waitingRoom.css'
import ludoGame from '../../../assets/images/ludoGame.png'
import Faces from '../../../assets/images/Faces.png'
import DashboardHeader from '../../dashboard/DashboardHeader/DashboardHeader'
import { allGames, allUsers } from '../../games/auxiliary/gamesAux'
import { useNavigate } from 'react-router-dom'
import Loader1 from '../../loaders/Loader1'


function WatingRoom() {

  const navigate = useNavigate()
  const navigateTo = path => navigate(path)

  const [randomGameId, setRandomGameId] = useState(null)
  const [isLeftBlockOpen, setIsLeftBlockOpen] = useState(true)
  const [isRightBlockOpen, setIsRightBlockOpen] = useState(true)
  const [blocksOpen, setBlocksOpen] = useState('both')


  useEffect(() => {
    const randomUserNum = Math.floor(Math.random() * (allUsers.length-1))
    const randomUserId = allUsers[randomUserNum].user_id

    const randomGameNum = Math.floor(Math.random() * (allGames.length-1))
    const randomGameId = allGames[randomGameNum].id
    setRandomGameId(randomGameId)

    const randomStakeAmount = Math.floor(Math.random() * 25) * 1000

    

    // const waitingTimeout = setTimeout(() => {
    //   navigateTo(`/tournaments/play/${randomUserId}/${randomGameId}/${randomStakeAmount}`)

    //   clearTimeout(waitingTimeout)
    // }, 3000)
  }, [])


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


  return (
    <div style={{ minHeight: '100vh' }} className='dashboard font-family-poppins'>
      <DashboardHeader />

      <div className='p-3 d-lg-flex d-md-flex d-block align-items-start justify-content-between'>

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

          <div className={`${blocksOpen == 'both' ? 'col-lg-8 col-md-8' : blocksOpen == 'one' ? 'col-lg-9 col-md-9' : blocksOpen == 'none' ? 'col-lg-10 col-md-10' : ''} col-12 px-lg-4 px-md-4 px-0 d-flex flex-column align-items-center`}>
              <div className='w-100'>
                {
                  randomGameId != null &&
                    <img className='col-lg-12 col-md-12 col-12' src={allGames.filter(game => game.id == randomGameId)[0].img} />
                }
              </div>
              <div className='w-100 mb-4'>
                <img src={Faces}  className='ludowidth mt-5 col-lg-12 col-12 col-md-12'  alt=""/>
              </div>
              <div className='w-100 mb-5 d-flex align-items-center justify-content-center'>
                <Loader1 />
              </div>
          </div>

          <div className={`${isRightBlockOpen ? 'col-lg-2 col-md-2' : 'col-lg-1 col-md-1'} d-lg-flex d-md-flex d-none align-items-center justify-content-end`}>
            <div className=''>
                <CollapseBlockRight setIsRightBlockOpen={setIsRightBlockOpen} />
            </div>
          </div>
      </div>
    </div>
  )
}

export default WatingRoom