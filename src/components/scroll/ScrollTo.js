import React, { useEffect } from "react";


export default function ScrollTo({ children, condition }){
    
    useEffect(() => {
        if(condition){
            window.scrollTo(0, 0)
        }
    }, [condition])
    
    return (
        <div className="m-0 p-0">
            { children }
        </div>
    )
}