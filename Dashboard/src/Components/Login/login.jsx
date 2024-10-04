import React from 'react';
import logo from './Assets/logo.png';
import login_img from './Assets/login-img.svg';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';

const Login = () => {
  const googleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='text-xl text-blue-900 mb-8'>Welcome to Nyaysetu , An AI powered legal help provider</div>

      <div className='bg-white shadow-lg rounded-lg w-full max-w-4xl p-6'>
        <div className='flex justify-center mb-6'>
          <img src={logo} alt='logo' className='w-64 h-auto' />
        </div>

        <div className='flex flex-col md:flex-row items-center justify-between'>
          <div className='w-full md:w-1/2 flex justify-center mb-6 md:mb-0'>
            <img src={login_img} alt='court-img' className='w-full h-auto max-w-sm' />
          </div>

          <div className='w-full md:w-1/2 flex flex-col items-center'>
            <button
              onClick={googleAuth}
              className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-full max-w-xs text-center transition duration-300'
            >
              Continue with Gmail
            </button>
          </div>
        </div>

        <p className='text-center text-gray-600 mt-6'>
          By continuing, you agree to our terms and acknowledge reading our terms & conditions.
        </p>
      </div>
    </div>
  );
};

export default Login;
