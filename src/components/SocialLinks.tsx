import { useEffect, useRef, useState } from 'react';
import Popup from "./Popup";


export default function SocialLinks({ title }: { title: string }) {
    const [currentUrl, setCurrentUrl] = useState<string>("");
    const [nonNativeShareVisiblity, setNonNativeShareVisiblity] = useState<Boolean>(false);
    const nonNativeDropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const handleMobileNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "This is title",
                    text: "This is dummy text",
                    url: window.location.href,
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            setNonNativeShareVisiblity(!nonNativeShareVisiblity);
        }
    }

    const handleClickOutside = (event: MouseEvent) => {
        const path = event.composedPath() as EventTarget[];
        if (nonNativeDropdownRef.current && !path.includes(nonNativeDropdownRef.current)) {
            setNonNativeShareVisiblity(!nonNativeDropdownRef);
        }
    };

    // for nonNative share dropdown disable;
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="">
            <div className="hidden sm:flex sm:items-center gap-4">
                <div className="w-6 h-6" title="Copy link">
                    <Popup popupContent={"Copied!"}>
                        <div id="copylinkdiv">
                            <img
                                src="/link-white.png"
                                alt="link-icon"
                                className="w-auto h-auto"
                                id="linkimgtag"
                            />
                        </div>
                    </Popup>
                </div>
                <div className="w-7 h-7">
                    <a
                        className="twitter-share-button"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="twitter"
                        id="twitter-icon"
                        href={`https://twitter.com/intent/tweet?url=${title + " -"} ${currentUrl}`}
                    >
                        <img
                            src="/twitter-icon.png"
                            alt="twitter-icon"
                            className="w-auto h-auto"
                        />
                    </a>
                </div>
                <div className="w-7 h-7">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                        id="LinkedIn-icon"
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                    >
                        <img
                            src="/linkedin-icon.png"
                            alt="linkedin-icon"
                            className="w-auto h-auto"
                        />
                    </a>
                </div>
                <div className="w-7 h-7">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        title="whatsapp"
                        id="whatsapp-icon"
                        href={`https://api.whatsapp.com/send?text=${currentUrl}`}
                    >
                        <img
                            src="/whatsapp-icon.png"
                            alt="whatsapp-icon"
                            className="w-auto h-auto"
                        />
                    </a>
                </div>
            </div>
            <div id="mobileshare" className="w-full sm:hidden cursor-pointer" onClick={handleMobileNativeShare} ref={nonNativeDropdownRef}>
                <span className="sr-only"> social Links</span>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M17 22C16.1667 22 15.4583 21.7083 14.875 21.125C14.2917 20.5417 14 19.8333 14 19C14 18.9 14.025 18.6667 14.075 18.3L7.05 14.2C6.78333 14.45 6.475 14.646 6.125 14.788C5.775 14.93 5.4 15.0007 5 15C4.16667 15 3.45833 14.7083 2.875 14.125C2.29167 13.5417 2 12.8333 2 12C2 11.1667 2.29167 10.4583 2.875 9.875C3.45833 9.29167 4.16667 9 5 9C5.4 9 5.775 9.071 6.125 9.213C6.475 9.355 6.78333 9.55067 7.05 9.8L14.075 5.7C14.0417 5.58333 14.021 5.471 14.013 5.363C14.005 5.255 14.0007 5.134 14 5C14 4.16667 14.2917 3.45833 14.875 2.875C15.4583 2.29167 16.1667 2 17 2C17.8333 2 18.5417 2.29167 19.125 2.875C19.7083 3.45833 20 4.16667 20 5C20 5.83333 19.7083 6.54167 19.125 7.125C18.5417 7.70833 17.8333 8 17 8C16.6 8 16.225 7.929 15.875 7.787C15.525 7.645 15.2167 7.44933 14.95 7.2L7.925 11.3C7.95833 11.4167 7.97933 11.5293 7.988 11.638C7.99667 11.7467 8.00067 11.8673 8 12C7.99933 12.1327 7.99533 12.2537 7.988 12.363C7.98067 12.4723 7.95967 12.5847 7.925 12.7L14.95 16.8C15.2167 16.55 15.525 16.3543 15.875 16.213C16.225 16.0717 16.6 16.0007 17 16C17.8333 16 18.5417 16.2917 19.125 16.875C19.7083 17.4583 20 18.1667 20 19C20 19.8333 19.7083 20.5417 19.125 21.125C18.5417 21.7083 17.8333 22 17 22Z"
                        fill="white"></path>
                </svg>
                <div className={`${nonNativeShareVisiblity ? '' : 'hidden'}`} id="shareDropdown" >
                    {
                        <div
                            className="absolute flex flex-col text-white bg-black -ml-32 mt-2 px-4 py-4 rounded-md drop-shadow text-center z-20 gap-2 transition duration-[9000ms] ease-in-out"
                        >
                            <div className="w-full">
                                <a
                                    className="twitter-share-button flex items-center gap-3"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="twitter"
                                    id="twitter-icon"
                                    href={`https://twitter.com/intent/tweet?url=${title + "-"} ${currentUrl}`}
                                >
                                    <img
                                        src="/twitter-icon.png"
                                        alt="twitter-icon"
                                        className="w-7 h-7"
                                    />
                                    <div className="">twitter</div>
                                </a>
                            </div>
                            <div className="w-full">
                                <a
                                    className="flex items-center gap-3"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="LinkedIn"
                                    id="LinkedIn-icon"
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                                >
                                    <img
                                        src="/linkedin-icon.png"
                                        alt="linkedin-icon"
                                        className="w-7 h-7"
                                    />
                                    <div className="">LinkedIn</div>
                                </a>
                            </div>
                            <div className="w-full">
                                <a
                                    className="flex items-center gap-3"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="whatsapp"
                                    id="whatsapp-icon"
                                    href={`https://api.whatsapp.com/send?text=${currentUrl}`}
                                >
                                    <img
                                        src="/whatsapp-icon.png"
                                        alt="whatsapp-icon"
                                        className="w-7 h-7"
                                    />
                                    <div className="">WhatsApp</div>
                                </a>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}
