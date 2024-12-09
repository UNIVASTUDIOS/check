import React from "react";
import { Modal } from 'react-bootstrap'
import CustomSvg from "../../svgs/CustomSvg";
import winnerImg from '../../../assets/images/winnerImg.png'
import { useNavigate } from "react-router-dom";


export default function GameWonModal({ modalProps, stakeAmount }){

    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const navigateTo = (path) => navigate(path)

    if(modalProps){

        const { visible, onHide, size } = modalProps

        const quitGame = () => {
            onHide()
            return navigateTo('/games')
        }

        const replayGame = () => {
            onHide()
            return goBack()
        }

        return (
            <Modal
                show={visible}
                onHide={quitGame}
                size={size ? size : 'sm'}
                centered={true}            
            >
                <div className="py-4 px-4 mx-3">
                    <div 
                        onClick={quitGame}
                        className="d-flex align-items-center justify-content-end mb-2 clickable"
                    >
                        <CustomSvg name='x' />
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="mb-3">
                            <img src={winnerImg} />
                        </div>
                        <p className="m-0 p-0 mb-3 txt-DC1212 regular-txt font-weight-500 text-center font-family-poppins text-uppercase">YOU EARNED &#8358;{stakeAmount}</p>
                        <div className="d-flex align-items-center">
                            <div onClick={replayGame} className="d-flex align-items-center clickable p-3 bg-73CD02 mx-1">
                                <p className="m-0 mx-1 p-0 txt-000 font-family-poppins regular-txt font-weight-500">Replay</p>
                                <div className="mx-1">
                                    <CustomSvg name="arrow-right" color="#000" />
                                </div>
                            </div>
                            <div onClick={quitGame} className="d-flex align-items-center p-3 bg-EA4335 clickable mx-1">
                                <p className="m-0 p-0 txt-FFF font-family-poppins regular-txt font-weight-500">Quit Game
</p>
                                <div className="mx-1">
                                    <CustomSvg name="arrow-right" color="#FFF" />
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div> 
            </Modal>
        )
    }

    return <></>
}