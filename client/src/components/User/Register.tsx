import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

    return (
        <div className="font-[sans-serif] text-[#333] bg-white">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 items-center">
        <form className="lg:col-span-3 md:col-span-2 max-w-lg w-full p-6 mx-auto">
          <div className="mb-16">
            <h3 className="text-4xl font-extrabold">Sign Up</h3>
            <p className="text-sm mt-6">Welcome! Please Sign up to access your account and explore a world of possibilities. Your journey begins here.</p>
          </div>
            <div className="relative flex items-center">
                <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">Email</label>
                <input type="email" placeholder="Enter email"
                className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-violet-600 rounded outline-none" />
                <FontAwesomeIcon icon={faEnvelope} className="w-[18px] h-[18px] absolute right-4 text-gray-400" />
            </div>
            <div className="mt-10 relative flex items-center">
                <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">Confirm Email</label>
                <input type="email" placeholder="Enter email"
                className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-violet-600 rounded outline-none" />
                <FontAwesomeIcon icon={faEnvelope} className="w-[18px] h-[18px] absolute right-4 text-gray-400" />
            </div>
            <div className="relative flex items-center mt-10">
            <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">Password</label>
            <input type={showPassword ? "text" : "password"} placeholder="Enter password"
                className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-violet-600 rounded outline-none" />
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="w-[18px] h-[18px] absolute right-4 text-gray-400 cursor-pointer" />
        </div>
        <div className="relative flex items-center mt-10">
            <label className="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px] font-semibold">Confirm Password</label>
            <input type={showPassword ? "text" : "password"} placeholder="Enter password"
                className="px-4 py-3.5 bg-white w-full text-sm border-2 border-gray-200 focus:border-violet-600 rounded outline-none" />
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="w-[18px] h-[18px] absolute right-4 text-gray-400 cursor-pointer" />
        </div>
          <div className="mt-8">
            <button type="button" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-violet-600 hover:bg-violet-700 focus:outline-none">
              Register
            </button>
          </div>
          <p className="text-sm mt-10 text-center">Already have an Account? <a href="javascript:void(0);" className="text-violet-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
        </form>
        <div className="flex flex-col justify-center space-y-16 md:h-screen max-md:mt-16 min-h-full bg-gradient-to-r from-violet-500 to-violet-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">Secure Authentication</h4>
            <p className="text-[13px] text-white mt-2">Log in with your registered email and password securely.</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Confirm Email</h4>
            <p className="text-[13px] text-white mt-2">Confirm Email to Sign up</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Confirm Password</h4>
            <p className="text-[13px] text-white mt-2">Confirm Password to Sign up</p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Forgot Password?</h4>
            <p className="text-[13px] text-white mt-2">Easily recover your account by clicking on the "Forgot Password?" link.</p>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Register;