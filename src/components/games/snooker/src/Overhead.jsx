import "./overhead.css"

import React, { useEffect, useState } from "react";

export default function Overhead({ /*Game,*/ playerOneInfo, playerTwoInfo, turn, winner }) {
    // const [playerOneInfo, setPlayerOneInfo] = useState({
    //     username: '',
    //     socketID: '',
    //     avatar: ''
    // })
    // const [playerTwoInfo, setPlayerTwoInfo] = useState({
    //     username: '',
    //     socketID: '',
    //     avatar: ''
    // })

    // const [turn, setTurn] = useState(0);

    // const [playerInfo, setPlayerInfo] = useState({
    //     playerOneInfo: {
    //         username: '',
    //         socketID: '',
    //         avatar: ''
    //     },
    //     playerTwoInfo: {
    //         username: '',
    //         socketID: '',
    //         avatar: ''
    //     }
    // })

    // useEffect(() => {
    //     Game.socket.once('start_game', (playerOneInfo, playerTwoInfo) => {
    //         console.log("start game");
    //         Game.mainLoop();
    //         window.notStarted = false

    //         setPlayerOneInfo(playerOneInfo)
    //         setPlayerTwoInfo(playerTwoInfo)
    //     })
    // }, [])

    useEffect(() => {
        // console.log("overhead turn", Game.policy.playerTurn);

        // setTurn(Game.policy.playerTurn)
    }, [])

    // console.log(playerOneInfo, playerTwoInfo, turn);

    return (
        <>
            <div className='snooker-overhead-wrapper'>
                <div className='snooker-overhead'>
                    <div /*style={{border: winner.answer && winner.winner == "user" ? "4px solid green" : ""}}*/
                        className={`snooker-prof1 ${/*!winner.winner && */ turn == 0 ? 'snooker-overhead-turn' : ''}`}
                    >
                        <div>
                            <img src={playerOneInfo.avatar} />
                        </div>
                        <div>
                            <p>{playerOneInfo.username}</p>
                        </div>
                        {/* <div className='snooker-color' style={{backgroundColor: colors[0]}}></div> */}
                    </div>
                    
                    <div /*style={{border: winner.answer && winner.winner == "opponent" ? "1px solid green" : ""}}*/
                        className={`snooker-prof2 ${/*!winner.winner && */ turn == 1 ? 'snooker-overhead-turn' : ''}`}
                    >
                        <div>
                            <img src={playerTwoInfo.avatar} />
                        </div>
                        <div>
                            <p>{playerTwoInfo.username}</p>
                        </div>
                        {/* <div className='snooker-color' style={{backgroundColor: colors[1]}}></div> */}
                    </div>
                </div>
            </div>
        </>
    );
}