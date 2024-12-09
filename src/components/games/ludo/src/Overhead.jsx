import { useRecoilValue } from "recoil";
import "./overhead.css"

import React from "react";
import { currentPlayerState } from "./recoil/atoms";

export default function Overhead(props) {
    const currentPlayer = useRecoilValue(currentPlayerState);

    return (
        <>
            <div className='ludo-overhead-wrapper'>
                <div className='ludo-overhead'>
                    <div /*style={{border: props.winner.winner && props.winner.answer.winner == 1 ? "4px solid green" : ""}} */
                        className={`ludo-prof1 ${/*!props.winner.winner && */ currentPlayer == props.colors[0] ? 'ludo-overhead-turn' : ''}`}
                    >
                        <div>
                            <img src={props.playerOneInfo.avatar} />
                        </div>
                        <div>
                            <p>{props.playerTwoInfo.username}</p>
                        </div>
                        <div className='ludo-color' style={{backgroundColor: props.colors[0]}}></div>
                    </div>
                    {
                        props.winner.winner && 
                        <div>
                            <p>Game Won</p>
                        </div>
                    }
                    <div /*style={{border: props.winner.winner && props.winner.answer.winner == 2 ? "1px solid green" : ""}} */
                        className={`ludo-prof2 ${/*!props.winner.winner && */ currentPlayer == props.colors[1] ? 'ludo-overhead-turn' : ''}`}
                    >
                        <div>
                            <img src={props.playerTwoInfo.avatar} />
                        </div>
                        <div>
                            <p>{props.playerTwoInfo.username}</p>
                        </div>
                        <div className='ludo-color' style={{backgroundColor: props.colors[1]}}></div>
                    </div>
                </div>
            </div>
        </>
    );
}