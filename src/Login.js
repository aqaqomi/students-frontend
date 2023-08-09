import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Config from './Config.json';
import localStorage from 'localStorage';
import { PiUserLight, PiPasswordLight } from 'react-icons/pi';


const Login = (props) => {

  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const headers = {
    headers: {
        "Content-Type": "application/json"
    }
  };

  const loginUser = async () => {
    const username =  document.querySelector('#username').value;
    const password =  document.querySelector('#password').value;
    if (!username) {
      document.querySelector('#username').classList.add('border-red-500');
      setLoginError(true);
    } else {
      document.querySelector('#username').classList.remove('border-red-500');
      setLoginError(false);
    }

    if (!password) {
      document.querySelector('#password').classList.add('border-red-500');
      setLoginError(true);
    } else {
      document.querySelector('#password').classList.remove('border-red-500');
      setLoginError(false);
    }

    if (username && password) {
      setLoginError(false);
      setLoading(true);
       await axios.post(`${Config.API_URL}/api/public/admin/auth`, {username: username, password: password}, headers)
       .then (result => {
        setLoading(false);
        localStorage.setItem('username', username);
        props.login(result.data.token)
       })
       .catch(err => {
        setLoading(false);
        setLoginError(true);
       });
    } else {
      setLoading(false);
      setLoginError(true);
    }
  };
  return (
    <div className='flex flex-col h-screen overflow-hidden bg-[#f4f7ff] items-center justify-center'>
        <div id="loginIcon" className='flex items-center justify-center flex-col mb-6'>
            <h2 className='m-0 p-0 space-0 mb-4 uppercase'>برای دسترسی به حساب کاربری خود، وارد شوید</h2> 
            <img src='./images/locks.png' className='w-1/2 mb-4 md:w-1/6' alt="login" />
        </div>
        <div id="formFields" className='flex flex-col items-end'>
            <div className='mb-6 p-1 border-b border-gray-200 flex flex-row items-center justify-start active:border-[#94e4ff] hover:border-[#94e4ff]' style={ loginError ? { borderBottom :'1px solid #ffa9a9ff' } : {}}>
                <PiUserLight className='mr-3 text-gray-300' style={ loginError ? { color :'#ff5959ff' } : {}} />
                <input id="username" type="text" className="form focus:outline-none bg-transparent active:border-[#94e4ff] hover:border-[#94e4ff]" placeholder="نام کاربری" autoCapitalize="none" autoCorrect={false} disabled={ loading ? "true" : ""} />
            </div>
            <div className='mb-6 p-1 border-b border-gray-200 flex flex-row items-center justify-start active:border-[#94e4ff] hover:border-[#94e4ff]' style={ loginError ? { borderBottom :'1px solid #ffa9a9ff' } : {}}>
                <PiPasswordLight className='mr-3 text-gray-300' style={ loginError ? { color :'#ff5959ff' } : {}} />
                <input id="password" type="password" className="form focus:outline-none bg-transparent active:border-[#94e4ff] hover:border-[#94e4ff]" placeholder="رمز عبور" autoCapitalize="none" autoCorrect={false} disabled={ loading ? "true" : ""} />
            </div>
            {loading ?
            <input type="button" value="در حال ورود..." className=" cursor-not-allowed px-4 py-1 text-white disabled:bg-[#f0f0f0] disabled:text-[#404041]" disabled />
            :
            <input onClick={loginUser} type="submit" value="ورود" className="px-4 py-1 text-white bg-[#0d3fd2] hover:bg-[#94e4ff] hover:text-[#0d3fd2]" />
            }
        </div>
        {
          loginError ? 
          <div className='absolute top-10 mt-6 border-[#ff5959ff] border-1 px-6 py-2 text-center mb-4 bg-[#ff5959ff] text-white flex flex-row items-center justify-start'>
            <div className='flex flex-row text-right'>
              خطا هنگام ورود
            </div>
          </div>
          :
          ""
        }
    </div>
  )
}

export default Login