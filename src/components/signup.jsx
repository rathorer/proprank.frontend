import React, { useEffect } from 'react'
import { loginUser, createUser } from '../services/api';

export default function () {

    useEffect(() => {
        let userDetails = JSON.parse(window.sessionStorage.getItem('user-details'));
        if (userDetails) {
            window.location.href = '/';
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        let form = event.target;
        let formData = new FormData(form);
        let name = formData.get("name");
        let email = formData.get("email");
        let password = formData.get("password");
        formData = { email, password, name };
        const response = await createUser(formData);
        if (response.status === 200) {
            window.sessionStorage.setItem('user-details', JSON.stringify(response.result));
            window.location.href = "/";
        } else {
            window.alert(`${response.result.resultMessage}`);
        }
    }

    return (
        <section className="">
            <div className=" items-center px-5 py-12 lg:px-20">
                <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
                    <div className="mt-8">
                        <div className="text-3xl text-center"> Sign up</div>
                        <div className="mt-6">
                            <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-neutral-600"> Full Name </label>
                                    <div className="mt-1">
                                        <input id="name" name="name" type="text" autoComplete="name" required placeholder="Your Full Name" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-neutral-600"> Email address </label>
                                    <div className="mt-1">
                                        <input id="email" name="email" type="email" autoComplete="email" required placeholder="Your Email" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-neutral-600"> Password </label>
                                    <div className="mt-1">
                                        <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Your Password" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign Up</button>
                                </div>

                                <div className="text-sm justify-center flex tracking-wide">
                                    <a href="/login" className="font-medium text-gray-900">
                                        Already have Account ?
                                        <span className='text-blue-600 hover:text-blue-500'> Login </span>
                                    </a>
                                </div>
                            </form>
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 text-neutral-600 bg-white"> Or continue with </span>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="w-full items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <div className="flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48">
                                            <defs>
                                                <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"></path>
                                            </defs>
                                            <clipPath id="b">
                                                <use xlinkHref="#a" overflow="visible"></use>
                                            </clipPath>
                                            <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"></path>
                                            <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"></path>
                                            <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"></path>
                                            <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"></path>
                                        </svg>
                                        <span className="ml-4"> Log in with Google</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
