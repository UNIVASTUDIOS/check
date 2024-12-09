import { Modal } from "react-bootstrap"
import CustomSvg from "../../svgs/CustomSvg"
import Loader1 from "../../loaders/Loader1"
import { useEffect } from "react"

export default function SuccessModal({ modalProps, redirectFunc, subTxt }){
    
    const { visible, onHide, size } = modalProps

    useEffect(() => {
        if(visible){
            const redirectDelay = setTimeout(() => {
                redirectFunc()

                clearTimeout(redirectDelay)
            }, 3000)
        }
    }, [visible])

    if(modalProps){
        return (
            <Modal
                show={visible}
                onHide={onHide}
                size={size ? size : 'sm'}
                centered={true}
                backdrop="static"
                keyboard={false}
            >
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <div className="p-5">
                        <div className="mb-4 d-flex align-items-center justify-content-center">
                            <CustomSvg name="registration-success-user" />
                        </div>

                        <h4 className="m-0 p-0 regular-txt txt-130828 font-family-quantico font-weight-700 text-center line-height-30 letter-spacing-_32 mb-4">Successful!</h4>
                    
                        <p className="m-0 p-0 font-family-poppins font-weight-300 txt-130828 text-center mb-4">{subTxt}</p>
                    
                        <div className="py-4 d-flex align-items-center justify-content-center">
                            <Loader1 />
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    return <></>
}