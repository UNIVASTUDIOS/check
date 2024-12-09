import { Modal } from "react-bootstrap";
import CustomSvg from "../../svgs/CustomSvg";
import '../css/games.css'

export default function JoinLobbyModal({ modalProps }){

    if(modalProps){

        const { onHide, visible, size } = modalProps

        return (
            <Modal
                show={visible}
                onHide={onHide}
                size={size ? size : 'sm'}
                centered={true} 
            >
                <div className="py-4 px-4 mx-3">
                    <div 
                        onClick={onHide}
                        className="d-flex align-items-center justify-content-end mb-4 clickable"
                    >
                        <CustomSvg name='x' />
                    </div>

                    <h4 className="p-0 m-0 mb-5 txt-130828 text-center font-family-quantico font-weight-700 line-height-30 letter-spacing-_32 medium-txt">Join Lobby</h4>
                
                    <div className="d-flex join-lobby-input align-items-center justify-content-between p-2 mb-3">
                        <div style={{ width: '3%' }}>
                            <CustomSvg name="code" />
                        </div>
                        <input
                            type="text"
                            style={{ width: '85%' }}
                            placeholder='Input Lobby Code'
                            className='txt-000 mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico'
                        />
                        <div style={{ width: '3%' }} className='d-flex jusitfy-content-start'>
                            <CustomSvg name="caret-down" />
                        </div> 
                    </div>

                    <button 
                        className='w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-5'
                    >
                        <p className='p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1'>Join Lobby</p>
                        <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                            <CustomSvg name={'arrow-right'} />
                        </div>
                    </button> 

                    <p className="m-0 p-0 txt-130828 text-center regular-txt font-family-poppins font-weight-300">
                        Welcome to Scrabble GO, the free new and updated version of the classic word game!                        
                    </p>                   
                </div>
            </Modal>
        )
    }

    return <></>
}