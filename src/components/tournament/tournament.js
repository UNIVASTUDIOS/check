import React,  {useEffect, useState} from 'react'
import './tournament.css'
import DashboardHeader from '../dashboard/DashboardHeader/DashboardHeader'
import CollapseBlockRight from '../dashboard/collapseblockright/collapseblockright'
import CollapseBlock from '../dashboard/CollapseBlockLeft/collapseblockleft'
import SelectedUserOpponent from '../../assets/images/SelectedUserOpponent.svg'
// import Ludotournament from '../../assets/images/Ludotournament.svg'
import Ludotournament from '../../assets/images/Ludotournament.png'
import VS from '../../assets/images/VS.svg'
import SelectedUserYou from '../../assets/images/SelectedUserYou.svg'
import CustomSvg from '../svgs/CustomSvg'
import { useNavigate, useParams } from 'react-router-dom'
import { allGames, allUsers } from '../games/auxiliary/gamesAux'
import GameWonModal from './auxiliary/GameWonModal'
import GameLostModal from './auxiliary/GameLostModal'


function Tournaments() {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const params = useParams()

  const { gameId, user_id, stakeValue, roomID } = params

  const goToGame = () => navigateTo(`/games/${gameId}?roomID=${roomID}`)

  const opponentInfo = allUsers.filter(user => user.user_id == user_id)[0]
  const gameInfo = allGames.filter(game => game.id == gameId)[0]

  const [openGames, setOpenGames] = useState(false);
  const [tournamentvs, setTournamentvs] = useState(true);
  const [isLeftBlockOpen, setIsLeftBlockOpen] = useState(true)
  const [isRightBlockOpen, setIsRightBlockOpen] = useState(true)
  const [blocksOpen, setBlocksOpen] = useState('both')
  const [gameWonModal, setGameWonModal] = useState({ visible: false, onHide: null, size: 'md' })
  const [gameLostModal, setGameLostModal] = useState({ visible: false, onHide: null, size: 'md' })

  useEffect(() => {
    const tempTimeout = setTimeout(() => {
      const num = Math.floor(Math.random() * 10)
      if(num > 5){
        openGameLostModal()
      } else{
        openGameWonModal()
      }
      clearTimeout(tempTimeout)
    }, 3000)
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

  const handleopen = () => {
    // setOpenGames(true);
    goToGame();
    
    setTournamentvs(false);


  }

  const openGameWonModal = () => setGameWonModal({ visible: true, onHide: hideGameWonModal, size: 'md' })
  const hideGameWonModal = () => setGameWonModal({ visible: false, onHide: null, size: 'md' })

  const openGameLostModal = () => setGameLostModal({ visible: true, onHide: hideGameLostModal, size: 'md' })
  const hideGameLostModal = () => setGameLostModal({ visible: false, onHide: null, size: 'md' })

  return (
    <div className='generaltournament' style={{ minHeight: '100vh' }}>
      <DashboardHeader />   
      <div className='w-100 mt-lg-4 mt-md-4 mt-4 px-lg-4 px-md-4 px-4'>
        {
          tournamentvs && (
          <div className='w-100'>
              <div className='d-lg-flex d-md-flex d-block align-items-start justify-content-between'>
              
                <div className='d-lg-none d-md-none d-flex align-items-center justify-content-between mb-4'>
                  <div className='col-lg-2'>
                    <CollapseBlock />
                  </div>
                  <div className='col-lg-2'>
                      <CollapseBlockRight />
                  </div>              
                </div>

                <div className={`${isLeftBlockOpen ? 'col-lg-2 col-md-2' : 'col-lg-1 col-md-1'} d-lg-flex d-md-flex d-none`}>
                  <CollapseBlock setIsLeftBlockOpen={setIsLeftBlockOpen} />
                </div>  

                <div className={`${blocksOpen == 'both' ? 'col-lg-8 col-md-8' : blocksOpen == 'one' ? 'col-lg-9 col-md-9' : blocksOpen == 'none' ? 'col-lg-10 col-md-10' : ''} col-auto px-lg-4 px-md-4 px-0`}>
                  <div className='selectedgeneral d-flex flex-column'>
                    <div className='selectedtext font-family-Quantico'>Selected <span className='userdifferent'>User</span></div>
                    <div className='d-flex flex-column Vsopponent justify-content-center align-items-center w-100'>
                      <div className='align-self-start col-lg-5 col-md-5 col-7'><img src={SelectedUserYou} className='col-lg-12 col-12'  alt=''/></div>
                      <div className='align-self-center col-lg-1 col-md-1 col-1'><img className='col-lg-12 col-md-12 col-12' src={VS} alt=''/></div>
                      <div className='align-self-end col-lg-5 col-md-5 col-7'>
                        <div className='d-flex align-items-center justify-content-end'>
                          <p className='m-0 p-0 txt-FFF font-weight-600 font-family-poppins regular-txt mx-4'>{opponentInfo.name}</p>
                          <div className={`${opponentInfo.bgClass} rounded-circle col-lg-5 col-md-5 col-5 p-1`}>
                            <img src={opponentInfo.profile} className='col-lg-12 col-md-12 col-12'  alt=''/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button 
                        onClick={handleopen}
                        className='w-100 bg-FBBC04 d-flex align-items-center justify-content-center p-2 mb-3'
                    >
                        <p className='p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1'>Play Game
</p>
                        <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                            <CustomSvg name={'arrow-right'} color="#000" />
                        </div>
                    </button>
                    <p className='m-0 p-0 mb-4 small-txt text-center font-weight-300 font-family-poppins txt-FFF opacity-_7'>
                      Stake 1k upwards for a 2 player game game, you will lose your stake
                    </p>
                  </div>
                </div>

                <div className={`${isRightBlockOpen ? 'col-lg-2 col-md-2' : 'col-lg-1 col-md-1'} d-lg-flex d-md-flex d-none align-items-center justify-content-end`}>
                  <div className=''>
                      <CollapseBlockRight setIsRightBlockOpen={setIsRightBlockOpen} />
                  </div>
              </div>
              </div>
          </div>  
        )}

        {openGames && ( 
          <div className='d-flex align-items-center justify-content-center py-lg-5 py-md-5 py-4'>
            <div className='d-flex flex-column align-items-center ludotournamentcontainer'>
                <div className='align-self-start col-lg-3 col-md-3 col-5'><img src={SelectedUserYou} className='col-lg-12 col-md-12 col-12'  alt=""/></div>
                <div className='align-self-center my-5 col-lg-8 col-md-3 col-12'><img src={gameInfo.img} alt="" className='col-lg-12 col-md-12 col-12'/></div>
                <div className='align-self-end col-lg-5 col-md-5 col-7'>
                  <div className='d-flex align-items-center justify-content-end'>
                    <p className='m-0 p-0 txt-FFF font-weight-600 font-family-poppins regular-txt mx-lg-4 mx-md-4 mx-2'>{opponentInfo.name}</p>
                    <div className={`${opponentInfo.bgClass} rounded-circle col-lg-3 col-md-3 col-5 p-1`}>
                      <img src={opponentInfo.profile} className='col-lg-12 col-md-12 col-12'  alt=''/>
                    </div>
                  </div>
                </div>                
            </div>

            <GameWonModal modalProps={gameWonModal} stakeAmount={stakeValue} />            
            <GameLostModal modalProps={gameLostModal} stakeAmount={stakeValue} />            
          </div>
        )}
      </div>
    </div>
  )
}

export default Tournaments