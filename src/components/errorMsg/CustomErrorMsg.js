import React from 'react'


export default function CustomErrorMsg({ errorMsg, noCenter, verticalPadding }){
    return (
        <p 
            style={{
                textAlign: noCenter ? 'start' : 'center'
            }}
            className={`
                ${verticalPadding && 'py-3'}
                m-0 p-0 py-2 txt-DC1212 small-txt font-weight-500 font-family-poppins
            `}
        >
            {errorMsg}
        </p>
    )
}