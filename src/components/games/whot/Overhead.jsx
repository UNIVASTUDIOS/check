import "./overhead.css"

import React from "react";

export default function Overhead({ playerOneInfo, playerTwoInfo, turn, winner }) {

    return (
        <>
            <div className='whot-overhead-wrapper'>
                <div className='whot-overhead'>
                    <div style={{border: winner.answer && winner.winner == "user" ? "4px solid green" : ""}}
                        className={`whot-prof1 ${/*!winner.winner && */ turn == 1 ? 'whot-overhead-turn' : ''}`}
                    >
                        <div>
                            <img src={playerOneInfo.avatar} />
                        </div>
                        <div>
                            <p>{playerOneInfo.username}</p>
                        </div>
                        {/* <div className='whot-color' style={{backgroundColor: colors[0]}}></div> */}
                    </div>
                    {
                        winner.answer && 
                        <div>
                            <p>Game Won</p>
                        </div>
                    }
                    <div style={{border: winner.answer && winner.winner == "opponent" ? "1px solid green" : ""}}
                        className={`whot-prof2 ${/*!winner.winner && */ turn == 2 ? 'whot-overhead-turn' : ''}`}
                    >
                        <div>
                            <img src={playerTwoInfo.avatar} />
                        </div>
                        <div>
                            <p>{playerTwoInfo.username}</p>
                        </div>
                        {/* <div className='whot-color' style={{backgroundColor: colors[1]}}></div> */}
                    </div>
                </div>
            </div>
        </>
    );
}