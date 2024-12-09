import React, { useEffect, useState } from 'react'
import './DashboardHero.css'
import {AvailableGamesData, TopGamers, carouselDetails} from '../../../data'
import ph_arrow_right_light from '../../../assets/images/ph_arrow_right_light.svg';
import enterRightarrow from '../../../assets/images/enterRightarrow.svg'
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import { allGames } from '../../games/auxiliary/gamesAux';
import CustomSvg from '../../svgs/CustomSvg';




function DashboardHero({ isLeftBlockOpen, isRightBlockOpen }) {

    const navigate = useNavigate()
    const navigateTo = path => navigate(path)
    const goToAllUsers = () => navigateTo('/all-users')
    const goToSelectedGame = ({ id }) => navigateTo(`/games/selected-game/${id}`)

    const [gamesCount, setGamesCount] = useState(5)
    const [usersCount, setUsersCount] = useState(8)

    useEffect(() => {
        if((isRightBlockOpen && !isLeftBlockOpen) || (isLeftBlockOpen && !isRightBlockOpen)){
            setGamesCount(4)
            setUsersCount(7)
        
        }

        if(isRightBlockOpen && isLeftBlockOpen){
            setGamesCount(3)
            setUsersCount(5)
        }

        if(!isRightBlockOpen && !isLeftBlockOpen){
            setGamesCount(5)
            setUsersCount(8)
        }
    }, [isRightBlockOpen, isLeftBlockOpen])

    const onSelectGame = ({ game }) => goToSelectedGame({ id: game.id })

    const playLudo = () => {
        const ludoGame = filterGames({ id: 'ludo' })
        return goToSelectedGame({ id: ludoGame.id })
    }

    const playChess = () => {
        const chessGame = filterGames({ id: 'chess' })
        return goToSelectedGame({ id: chessGame.id })
    }

    const playScrabble = () => {
        const scrabbleGame = filterGames({ id: 'scrabble' })
        return goToSelectedGame({ id: scrabbleGame.id })
    }

    const playSnooker = () => {
        const snookerGame = filterGames({ id: 'snooker' })
        return goToSelectedGame({ id: snookerGame.id })
    }

    const filterGames = ({ id }) => {
        const filtered = allGames.filter(game => game.id == id)
        return filtered[0]
    }

    return (
        <div className='d-flex w-100 align-items-center justify-content-center'>
            <div className='availablegamescontainer'>
                <div className='col-12'>
                    <Carousel className='w-100'>
                        <Carousel.Item className='bg-img carousel-1-bg mb-5 p-lg-5 p-md-5 p-1'>
                            <div className='px-lg-4 px-md-4 px-2'>
                                <div className='d-flex flex-column justify-content-between carouselleft'>
                                    <div className='gamestitles'>Ludo<span className='additionaltext'>Quest</span></div>
                                    <div className='gamesdescription font-family-poppins'>Roll the Dice, Take Friends Down</div>
                                    <div className='d-flex align-items-center justify-content-start'>
                                        <div onClick={playLudo} className='enterbutton px-5 py-3 clickable'>Enter <img src={enterRightarrow} alt='arrow'/></div>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        
                        <Carousel.Item className='bg-img carousel-2-bg mb-5 p-lg-5 p-md-5 p-1'>
                            <div className='px-lg-4 px-md-4 px-2'>
                                <div className='d-flex flex-column justify-content-between carouselleft'>
                                    <div className='gamestitles'>Chess<span className='additionaltext'>Duel</span></div>
                                    <div className='gamesdescription font-family-poppins'>Join the  battle of minds</div>
                                    <div className='d-flex align-items-center justify-content-start'>
                                        <div onClick={playChess} className='enterbutton px-5 py-3 clickable'>Enter <img src={enterRightarrow} alt='arrow'/></div>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        
                        <Carousel.Item className='bg-img carousel-3-bg mb-5 p-lg-5 p-md-5 p-3'>
                            <div className='px-4'>
                                <div className='d-flex flex-column justify-content-between carouselleft'>
                                    <div className='d-flex align-items-center gap-2 flex-wrap'>
                                        <h2 className='gamestitles m-0 p-0'>Scrabble</h2>
                                        <h2 className='gamestitles additionaltext m-0 p-0'>Clash</h2>
                                    </div>                                    
                                    <div className='gamesdescription font-family-poppins'>Craft words, compete, claim victory.</div>
                                    <div className='d-flex align-items-center justify-content-start'>
                                        <div onClick={playScrabble} className='enterbutton px-5 py-3 clickable'>Enter <img src={enterRightarrow} alt='arrow'/></div>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item className='bg-img carousel-4-bg mb-5 p-lg-5 p-md-5 p-3'>
                            <div className='px-4'>
                                <div className='d-flex flex-column justify-content-between carouselleft'>
                                    <div className='d-flex gap-2 align-items-center flex-wrap'>
                                        <h2 className='gamestitles m-0 p-0'>Snooker</h2>
                                        <h2 className='gamestitles additionaltext m-0 p-0'>Strike</h2>
                                    </div>
                                    <div className='gamesdescription font-family-poppins'>Pot balls, score high, reign supreme</div>
                                    <div className='d-flex align-items-center justify-content-start'>
                                        <div onClick={playSnooker} className='enterbutton px-5 py-3 clickable'>Enter <img src={enterRightarrow} alt='arrow'/></div>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>


                <div className='d-flex combinations mb-5'>
                    <div className='Availabletitle font-family-poppins'>Available Games</div>
                        <div className='availablegeneral d-flex justify-content-lg-between justify-content-md-between justify-content-center'>
                            {allGames.slice(0, gamesCount).map((availablegames) => (
                                <div 
                                    onClick={() => onSelectGame({ game: availablegames })} 
                                    className={`col-12 clickable ${gamesCount == 5 ? 'col-lg-2 col-md-2' : gamesCount == 4 ? 'col-lg-3 col-md-3' : gamesCount == 3 ? 'col-lg-4 col-md-4' : ''} d-flex align-items-center justify-content-center`
                                }>
                                    <div className={`col-12 ${gamesCount == 5 ? 'col-lg-12' : 'col-lg-11 col-md-11'} availableContainer mt-4`} id={availablegames.id}>
                                        <div className='col-12'>
                                            <img src={availablegames.img} className='mb-4 col-12'/>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <div className='gamesname mb-2'>{availablegames.title}</div>
                                                <div className='gameswriteup font-family-poppins extra-small-txt'>{availablegames.caption}</div>
                                            </div>
                                            
                                            <div className='anchorarrow'>
                                                <CustomSvg name="arrow-right" color={availablegames.arrowColor} width={'16px'} height={'16px'} />
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            ) ) }
                        </div>
                </div>

                

                <div>
                    <div className='d-flex justify-content-between mb-3'>
                        <div className='font-family-poppins topgamertitle'>Top Gamers</div>
                        <div onClick={goToAllUsers} className='clickable'><p className='font-family-poppins seelink topgamersseeall'> see all <img  src={ph_arrow_right_light} alt='.'/></p></div>
                    </div>

                    <div className='d-flex justify-content-xxxl-center justify-content-lg-between justify-content-md-between justify-content-between flex-wrap'>
                        {TopGamers.slice(0, usersCount).map((topgamers) => (
                            <div className='col-lg-auto col-md-auto col-3 my-2 mx-lg-2 mx-md-2 mx-2 d-flex align-items-center justify-content-center' id={topgamers.id}>
                                <div className='col-lg-auto col-md-auto col-11 justify-content-center d-flex flex-column align-items-center'>
                                    <div className='col-12'>
                                        <img src={topgamers.img} alt={topgamers.gamersname} className='mb-2 col-12'/>
                                    </div>
                                    <div className=' font-family-poppins txt-FFF'>{topgamers.gamersname}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default DashboardHero