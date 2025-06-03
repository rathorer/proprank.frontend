import { useEffect, useRef, useState } from 'react';

const Dropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState<Boolean>(false);
    const [loggedIn, setLoggedIn] = useState<Boolean>(false);
    const [userDetails, setUserDetail] = useState<Record<string, any>>({});
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [smallScreen, setSmallScreen] = useState(false);


    const toggleDropdown = () => {
        if (smallScreen) {
            const drawer = document.getElementById('drawer') as HTMLElement;
            if (drawer.classList.contains('right-[-300px]')) {
                drawer.classList.remove("right-[-300px]")
                drawer.classList.add('right-[0px]')
            } else {
                drawer.classList.remove("right-[0px]")
                drawer.classList.add('right-[-300px]')
            }
        } else {
            setDropdownOpen(!dropdownOpen);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        const path = event.composedPath() as EventTarget[];
        if (dropdownRef.current && !path.includes(dropdownRef.current)) {
            setDropdownOpen(false);
        }
    };

    const handleLogout = () => {
        window.sessionStorage.removeItem('user-details');
        setUserDetail({});
        setLoggedIn(false);
        window.location.href = '/';
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const user = window.sessionStorage.getItem("user-details");
        if (user) {
            const userDetailObj = JSON.parse(user);
            setLoggedIn(true);
            setUserDetail(userDetailObj.user);
        }
        setSmallScreen(window.innerWidth <= 500);
    }, [])

    return (
        <div ref={dropdownRef}>
            <div
                onClick={toggleDropdown}
                className="text-[#252d47] focus:outline-none flex flex-col items-end justify-start"
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
                {!smallScreen && dropdownOpen && (
                    <div className="absolute mt-6 w-48 bg-white rounded-md drop-shadow text-center z-50">
                        {loggedIn ?
                            <div className='block px-4 py-2'>
                                {userDetails?.name}
                                <hr />
                            </div>
                            : <></>}
                        <a href="/#infographics" className='block px-4 py-2 hover:bg-gray/20'>
                            <button className="">
                                Infographics
                            </button>
                        </a>
                        <a href="/#caseStudy" className='block px-4 py-2 hover:bg-gray/20'>
                            <button className="">
                                Case Study
                            </button>
                        </a>
                        <a href="/#Shorts" className='block px-4 py-2 hover:bg-gray/20'>
                            <button className="">
                                Shorts
                            </button>
                        </a>
                        {/* <hr className='border-white' /> */}
                        {loggedIn ? <a href="/" className='block px-4 py-2 hover:bg-gray/20' onClick={handleLogout} id='logout-btn'>
                            <button className="">
                                Logout
                            </button>
                        </a> : <a href="/login" className='block px-4 py-2 hover:bg-gray/20'>
                            <button className="">
                                Login | Sign up
                            </button>
                        </a>}
                    </div>
                )}
            </div>
            {smallScreen && <div className="fixed top-0 right-[-300px] w-64 h-full bg-white transform transition-transform duration-500 ease-in-out shadow-2xl py-8 px-3 z-[200]" id='drawer'>
                <div className="flex justify-between items-center">
                    {loggedIn &&
                        <div className='block'>
                            {userDetails?.name}
                        </div>
                    }
                    <button className="text-gray-dark text-xl font-medium" onClick={toggleDropdown}>
                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.5 9.5L9.5 22.5M9.5 9.5L22.5 22.5" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="mt-10">
                    <form id="search-form-drawer" className="" action="/search">
                        <label htmlFor="search-input" className="sr-only">Search</label>
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                id="drawerSearchInput"
                                name="query"
                                className="bg-gray-50 border border-gray-light text-gray-900 text-sm rounded-lg block w-full p-2"
                                placeholder="Search articles..."
                                required
                            />
                            <button type="submit" className="p-2 text-white rounded-lg absolute right-1 bg-blue-500 ">
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-5 text-left text-gray-dark">
                    <div className='block px-2 py-2 hover:bg-gray/20' onClick={() => {
                        window.location.hash = '#infographics';
                        toggleDropdown();
                    }}>
                        <button className="">
                            Infographics
                        </button>
                    </div>
                    <div className='block px-2 py-2 hover:bg-gray/20' onClick={() => {
                        window.location.hash = '#caseStudy';
                        toggleDropdown();
                    }}>
                        <button className="">
                            Case Study
                        </button>
                    </div>
                    <div className='block px-2 py-2 hover:bg-gray/20' onClick={() => window.location.hash = "#Shorts"}>
                        <button className="">
                            Shorts
                        </button>
                    </div>
                    {loggedIn ? <a href="/" className='block px-2 py-2' onClick={handleLogout} id='logout-btn-drawer'>
                        <button className="">
                            Logout
                        </button>
                    </a> : <a href="/login" className='block px-2 py-2'>
                        <button className="">
                            Login | Sign up
                        </button>
                    </a>}
                </div>
            </div>}
        </div>
    );
};

export default Dropdown;
