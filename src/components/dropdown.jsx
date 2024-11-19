import React, { useEffect, useRef, useState } from 'react';

const Dropdown = (props) => {
    let show = props.show;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userDetails, setUserDetail] = useState({});
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };
    
    const handleLogout = () => {
        window.sessionStorage.removeItem('user-details');
        setLoggedIn(false);
        setUserDetail({});
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        let userDetails = JSON.parse(window.sessionStorage.getItem('user-details'));
        if (userDetails) {
            setLoggedIn(true);
            setUserDetail(userDetails.user);
        }
    }, [])

    return (
        <div ref={dropdownRef} >
            <div
                onClick={toggleDropdown}
                className="text-secondary2 hover:text-gray-400 focus:outline-none flex flex-col items-end justify-start z-30"
            >
                <span className="sr-only">Open main menu</span>
                <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h15M1 7h15M1 13h15">
                    </path>
                </svg>
                {dropdownOpen && (
                    <div className="absolute mt-2 w-48 bg-gray rounded-md shadow-lg text-center z-auto">
                        {loggedIn ?
                            <div className='block px-4 py-2 text-white '>
                                {userDetails?.name}
                                <hr />
                            </div>
                            : <></>}

                        {/* <a href="/" className='block px-4 py-2 text-white hover:bg-slate-400'>
                            <button className="">
                                Home
                            </button>
                        </a>
                        <a href="/articles" className='block px-4 py-2 text-white hover:bg-slate-400'>
                            <button className="">
                                All Articles
                            </button>
                        </a> */}
                        <a href="/articles" className='block px-4 py-2 text-white hover:bg-slate-400'>
                            <button className="">
                                Infographics
                            </button>
                        </a>
                        <a href="/about" className='block px-4 py-2 text-white hover:bg-slate-400'>
                            <button className="">
                                About
                            </button>
                        </a>
                        {loggedIn ? <a href="/" className='block px-4 py-2 text-white hover:bg-slate-400' onClick={handleLogout} >
                            <button className="">
                                Logout
                            </button>
                        </a> : <a href="/login" className='block px-4 py-2 text-white hover:bg-slate-400'>
                            <button className="">
                                Login | Sign up
                            </button>
                        </a>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
