import "./overhead.css"

import React from "react";

export default function Overhead({ playerOneInfo, playerTwoInfo, turn, winner }) {

    return (
        <>
            <div className='scrabble-overhead-wrapper'>
                <div className='scrabble-overhead'>
                    <div /*style={{border: winner.winner && winner.answer.winner == 1 ? "4px solid green" : ""}} */
                        className={`scrabble-prof1 ${/*!winner.winner && */ turn == 0 ? 'scrabble-overhead-turn' : ''}`}
                    >
                        <div>
                            <img src={playerOneInfo.avatar} />
                        </div>
                        <div>
                            <p>{playerOneInfo.username}</p>
                        </div>
                        {/* <div className='scrabble-color' style={{backgroundColor: colors[0]}}></div> */}
                    </div>
                    {
                        winner.winner && 
                        <div>
                            <p>Game Won</p>
                        </div>
                    }
                    <div /*style={{border: winner.winner && winner.answer.winner == 2 ? "1px solid green" : ""}} */
                        className={`scrabble-prof2 ${/*!winner.winner && */ turn == 1 ? 'scrabble-overhead-turn' : ''}`}
                    >
                        <div>
                            <img src={playerTwoInfo.avatar} />
                        </div>
                        <div>
                            <p>{playerTwoInfo.username}</p>
                        </div>
                        {/* <div className='scrabble-color' style={{backgroundColor: colors[1]}}></div> */}
                    </div>
                </div>
            </div>
        </>
    );
}