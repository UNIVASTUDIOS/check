import React from "react";
import CustomSvg from "../../svgs/CustomSvg";


const messages = [
    {
        type: 'sender',
        msg: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to m`
    },
    {
        type: 'receiver',
        msg: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to m`
    },
    {
        type: 'sender',
        msg: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to m`
    },
]


export default function ChatMsgs(){

    const displayMsgs = messages.map((message, i) => {
        const { type, msg } = message

        return(
            <div 
                key={i}
                className={`${type == 'sender' ? 'justify-content-end' : 'justify-content-start'} d-flex`}
            >
                <div className={`${type == 'sender' ? 'chat-chat-msgs-send-msg-container' : 'chat-chat-msgs-receive-msg-container'} col-lg-5 col-md-5 col-10 p-lg-4 p-md-4 p-3 mb-lg-0 mb-md-0 mb-2`}>
                    <p className="m-0 p-0 txt-FFF small-txt font-family-poppins font-weight-400">
                        { msg }
                    </p>
                </div>
            </div>
        )
    })

    return (
        <div className="w-100 h-100 d-flex flex-column justify-content-between">
            <div style={{ maxHeight: '50vh', overflowY: 'scroll' }} className="px-4 mb-4" >
                { displayMsgs }
            </div>

            <div className="chat-chat-msgs-type-container py-2 px-4 d-flex justify-content-between align-items-center">
                <div className="clickable">
                    <CustomSvg name="emoji" />
                </div>
                <div className="clickable mx-3">
                    <CustomSvg name="link" />
                </div>
                <div className="col-lg-11">
                    <input 
                        type="text"
                        className="w-100 p-2 chat-chat-msgs-type-input-container font-family-poppins font-weight-400 small-txt txt-FFF"
                        placeholder="Type your message here"
                    />
                </div>                
            </div>
        </div>
    )
}