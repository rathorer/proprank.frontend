import React, { useEffect, useState } from 'react';

interface PopupProps {
    children: React.ReactNode;
    popupContent: string;
}

export default function Popup({ children, popupContent }: PopupProps) {
    const [show, setShow] = useState<Boolean>(false);

    const handleClick = () => {
        setShow(!show);
    }

    useEffect(() => {
        let timeout: NodeJS.Timeout;
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
