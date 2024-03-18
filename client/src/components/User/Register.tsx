import { useState } from 'react';

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        return (
            <div className="flex flex-wrap">
                <div className="flex w-full flex-col md:w-1/2">
                    <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
                        <p className="text-left text-3xl font-bold">Welcome</p>
                        <p className="mt-2 text-left text-gray-500">Welcome please enter your details.</p>
                        <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"><img className="mr-2 h-5" src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" /> Sign Up with Google</button>
                        <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                            <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">or</div>
                        </div>
                        <form className="flex flex-col pt-3 md:pt-8">
                            <div className="flex flex-col pt-4">
                                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                    <input type="email" id="login-email" className="w-full flex-1 appearance-none border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" />
                                </div>
                            </div>
                            <div className="flex flex-col pt-4">
                                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                    <input type="email" id="login-email" className="w-full flex-1 appearance-none border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Confirm Email" />
                                </div>
                            </div>
                            <div className="flex flex-col pt-4">
                                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                    <input type="password" id="login-password" className="w-full flex-1 appearance-none border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password" />
                                </div>
                            </div>
                            <div className="flex flex-col pt-4">
                                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                    <input type="password" id="login-password" className="w-full flex-1 appearance-none border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Confirm Password" />
                                </div>
                            </div>
                            <button type="submit" className="w-full rounded-lg bg-amber-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 mt-10">Sign in</button>
                        </form>
                        <div className="py-12 text-center">
                            <p className="whitespace-nowrap text-gray-600">
                                Already have an account?
                                <a href="#" className="underline-offset-4 font-semibold text-amber-900 underline"> have and Account?</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
                    <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
                        <p className="mb-8 text-3xl font-semibold leading-10">We offer a wide range of books faster than our competitors and maintain a consistent inventory. While they're struggling with supply issues, we're releasing new titles.</p>
                        <p className="mb-4 text-3xl font-semibold">John doe</p>
                        <p className="">Founder, BookBliss</p>
                        <p className="mb-7 text-sm opacity-70">Online Bookstore</p>
                    </div>
                    <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-90" src="https://source.unsplash.com/random/?Books" />
                </div>
            </div>
    
        );
}

export default Register;