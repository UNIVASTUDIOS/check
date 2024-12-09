import "../overhead.css"

import React from "react";

export default class Overhead extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <>
            <div className='overhead-wrapper'>
                <div className='overhead'>
                    <div style={{border: this.props.winner.winner && this.props.winner.answer.winner == 1 ? "4px solid green" : ""}} 
                        className={`prof1 ${!this.props.winner.winner && this.props.turn == 'white' ? 'overhead-turn' : ''}`}
                    >
                        <div>
                            <img src={this.props.playerOneInfo.avatar} />
                        </div>
                        <div>
                            <p>{this.props.playerOneInfo.username}</p>
                        </div>
                        <div className='chess-color' style={{backgroundColor: "white"}}></div>
                    </div>
                    {
                        this.props.winner.winner && 
                        <div>
                            <p>Game Won</p>
                        </div>
                    }
                    <div style={{border: this.props.winner.winner && this.props.winner.answer.winner == 2 ? "1px solid green" : ""}} 
                        className={`prof2 ${!this.props.winner.winner && this.props.turn == 'black' ? 'overhead-turn' : ''}`}
                    >
                        <div>
                            <img src={this.props.playerTwoInfo.avatar} />
                        </div>
                        <div>
                            <p>{this.props.playerTwoInfo.username}</p>
                        </div>
                        <div className='chess-color' style={{backgroundColor: "black"}}></div>
                    </div>
                </div>
            </div>
        </>
    }
}