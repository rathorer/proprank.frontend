import React, { useEffect, useState } from 'react'

export default function Popup(props) {
    const { children, popupContent } = props;
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show);
    }

    useEffect(() => {
        let timeout;
        if (show) {
            timeout = setTimeout(() => {
                setShow(false);
            }, 1500);
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [show])


    return (
        <div>
            <div className="flex flex-col-reverse cursor-pointer" onClick={handleClick}>
                {children}
                {show && <div className="absolute mb-10 bg-[#72839c] px-3 rounded-md -ml-6 text-white">
                    {popupContent}
                </div>}
            </div>
        </div>
    )
}
