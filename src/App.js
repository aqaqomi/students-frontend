import {  BrowserRouter,  Routes,  Route } from "react-router-dom";
import { useState } from "react";
import './index.css'
import localStorage from 'localStorage';
import { CgMenu, CgClose } from 'react-icons/cg';
import { LuLogOut } from 'react-icons/lu';


import Login from "./Login";
import Dashboard from "./Dashboard";
import AddAdmin from "./Components/Pages/AddAdmin";
import AddUser from "./Components/Pages/AddUser";
import AddPlan from "./Components/Pages/AddPlan";
import SingleAdmin from "./Components/Data/SingleAdmin";
import SingleUser from "./Components/Data/SingleUser";
import SinglePlan from "./Components/Data/SinglePlan";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showMenu, setShowMenu] = useState(false);
  const changeLogin = async (value) => {
      localStorage.setItem('token', value)
      setToken(value)
  };
  const removeToken = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.clear();
    localStorage.clear();
    setToken(null);
  };
  const viewMenu = () => {
    const menu = document.querySelector('#menu');
    if (menu.classList.contains('right-0')) {
      menu.classList.remove('right-0');
      menu.classList.add('-right-3/4');
      setShowMenu(false);
    } else {
      menu.classList.add('right-0');
      menu.classList.remove('-right-3/4');
      setShowMenu(true);
    }
  };
  return (
    <div id='APP' className="min-h-screen h-full bg-[#f4f7ff]">
      {token ?
      <BrowserRouter>
        <>
          <main className="bg-[#f4f7ff] h-full w-screen">
              <header className="px-8 bg-white border-b border-[#ececec] sticky top-0 left-0 right-0 z-50 w-screen z-40 border-b border-gray-100 p-4 flex flex-row items-center justify-between shadow shadow-sm">
                <div className="text-gray-600 flex flex-row justify-center items-center">
                  {!showMenu ? 
                  <CgMenu onClick={viewMenu} size={20} className=" cursor-pointer" />
                  :
                  <CgClose onClick={viewMenu} size={20} className=" cursor-pointer" />
                  }
                  <h4 className="mx-2">
                    پنل کاربری
                  </h4>
                </div>
                <div className="flex flex-row items-center justify-center">
                    <div className="uppercase text-sm mx-2 my-0 py-0 font-default">
                      {localStorage.getItem('username')}
                    </div>
                  <LuLogOut className="rotate-180 cursor-pointer text-[#ff5959ff]" size={16} onClick={removeToken} />
                </div>
              </header>
              <section id="menu" className="fixed z-10 p-4 bg-white border-l border-[#ececec] shadow w-3/4 h-full -right-3/4 transition-all md:w-1/6">
                داشبورد
              </section>
              <Routes> 
                <Route index element={<Dashboard token={token} logout={removeToken} />} />
                <Route path="/addadmin" element={<AddAdmin token={token} logout={removeToken} />} />
                <Route path="/adduser" element={<AddUser token={token} logout={removeToken} />} />
                <Route path="/addplan" element={<AddPlan token={token} logout={removeToken} />} />
                <Route path="/admin/:username" element={<SingleAdmin token={token} logout={removeToken} />} />
                <Route path="/user/:mobile" element={<SingleUser token={token} logout={removeToken} />} />
                <Route path="/plan/:name" element={<SinglePlan token={token} logout={removeToken} />} />
              </Routes>
          </main>
        </>
      </BrowserRouter>
      :
      <Login login={changeLogin} />
      }
    </div>
  );
}

export default App;