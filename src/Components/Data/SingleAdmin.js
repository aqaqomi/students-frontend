import { useEffect, useState } from 'react'
import {FiSettings} from 'react-icons/fi'
import Skeleton from 'react-loading-skeleton';
import Config from '../../Config.json'
import { useLocation } from 'react-router-dom';
import axios from 'axios'


const SingleAdmin = (props) => {
    const apiPath = "/admin";
    const headers = {
        headers: {
          "Content-Type": "application/json",
          "token": `${props.token}`
        }
    };

    const [item, setItem] = useState(useLocation().pathname.replace("/admin/",""));

    const [itemError, setItemError] = useState(false);
    const [itemLoading, setItemLoading] = useState(false);
    const [updateInput1, setUpdateInput1] = useState(null);
    const [updateInput2, setUpdateInput2] = useState(null);
    const [updateInput3, setUpdateInput3] = useState(null);
        
    const [updateLoading, setUpdateLoading] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);
    const [passSuccess, setPassSuccess] = useState(null);
    const [passError, setPassError] = useState(null);
    const [passLoading, setPassLoading] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [currentPassword, setCurrentPassword] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwrdRepeat, setPasswordRepeat] = useState(null);

    const fetchData = async () => {
        try {
            setItemLoading(true);
            setItemError(false);
            const data = await axios.post(`${Config.API_URL}${Config.ADMIN_API}${Config.VIEW}${apiPath}`, {username: item}, headers);
            setItemError(false);
            setItemLoading(false);
            setItem(data.data.data);
            setUpdateInput1(data.data.data.firstName)
            setUpdateInput2(data.data.data.lastName)
            setUpdateInput3(data.data.data.username)
        } catch (err) {
            setItemError(true);
            setItemLoading(false);
            setItem(null);
        }
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const updateItem = async () => {
        const headers = {
            headers: {
              "Content-Type": "application/json",
              "token": `${props.token}`
            }
          };
          setUpdateLoading(true);
          setUpdateError(false);
        await axios.put(`${Config.API_URL}${Config.ADMIN_API}${Config.UPDATE}${apiPath}`, {username: updateInput3, firstName: updateInput1, lastName: updateInput2}, headers)
        .then (response => {
            setUpdateLoading(false);
            setUpdateError(false);
            setUpdateInput1(response.data.data.firstName);
            setUpdateInput2(response.data.data.lastName);
            setUpdateInput3(response.data.data.username);
            setUpdateSuccess(true);
        })
        .catch (err =>{
            setUpdateLoading(false);
            setUpdateError(true);
            setUpdateSuccess(false);
        });
      };

      const changePassword = async (item) => {
        setPassSuccess(false);
        setPassError(false);
        setPassLoading(false);
        const headers = {
            headers: {
              "Content-Type": "application/json",
              "token": `${props.token}`
            }
          };
        const currentpass = document.querySelector('#currentpass');
        const newpass = document.querySelector('#newpass');
        const newpassrepeat = document.querySelector('#newpassrepeat');
        if (!currentpass.value || !currentPassword) {
            currentpass.classList.add('border-red-500')
        } else {
            currentpass.classList.remove('border-red-500')
        }
        if (!newpass.value || !password) {
            newpass.classList.add('border-red-500')
        } else {
            newpass.classList.remove('border-red-500')
        }
        if (!newpassrepeat.value || !passwrdRepeat) {
            newpassrepeat.classList.add('border-red-500')
        } else {
            newpassrepeat.classList.remove('border-red-500')
        }
        if (item && currentPassword && password && passwrdRepeat && currentpass.value && newpass.value && newpassrepeat.value) {
            setPassLoading(true);
            await axios.put(`${Config.API_URL}${Config.ADMIN_API}${Config.CHANGE_PASS}${apiPath}`, {
                username: item,
                password: currentPassword,
                newPassword: password,
                newPasswordRepeat:passwrdRepeat
            }, headers)
            .then(result => {
                setPassSuccess(true);
                setPassError(false);
                setPassLoading(false);
            })
            .catch(err => {
                setPassSuccess(false);
                setPassError(true);
                setPassLoading(false);
            })
        }

      };

      const deleteItem = async (item) => {
        const headers = {
            headers: {
              "Content-Type": "application/json",
              "token": `${props.token}`
            }
        };
        
        setDeleteLoading(true);
        setDeleteError(false);
        setDeleteSuccess(false);
        if (item !== "system") {
            await axios.post(`${Config.API_URL}${Config.ADMIN_API}${Config.DELETE}/admin`, {username: item}, headers)
            .then(result => {
                setDeleteLoading(false);
                setDeleteError(false);
                setDeleteSuccess(true);
            })
            .catch(err => {
                setDeleteLoading(false);
                setDeleteError(true);
                setDeleteSuccess(false);
            });
        } else {
            setDeleteLoading(false);
            setDeleteError(true);
            setDeleteSuccess(false);
        }
      };

  return (
    <div className='p-8 h-full'>
        <div className='bg-white border rounded md:max-w-[50%] md:mx-auto'>
        <div className='modal-head flex flex-row items-center justify-between p-4'>
            <div className='flex flex-row items-center justify-center'>
                <FiSettings size={24} />
                <div className='fw-bold text-md mr-2'>
                    عملیات مدیر
                </div>
            </div>
        </div>
        <hr />
        {itemError ? "Item Error"
        :itemLoading ?
        <div className='p-6'>
            <div className='w-full'>
                <Skeleton height={32} width="100%" count={3} />
            </div>
            <div className='w-full mt-4'>
                <Skeleton height={32} width="100%" count={3} />
            </div>
            <div className='w-full mt-4'>
                <Skeleton height={32} width="100%" count={1} />
            </div>
            <div className='w-full mt-4'>
                <Skeleton height={32} width="100%" count={1} />
            </div>
            <div className='w-full mt-4'>
                <Skeleton height={32} width="100%" count={1} />
            </div>
        </div>
        :item ?
        <div className='p-6'>
            <div className='flex flex-col items-start justify-start'>
                <label className='text-xs'>نام کاربری: </label>
                <input onChange={(e) => setUpdateInput3(e.target.value)} id="updateInput3" type="text" className='text-sm border rounded p-1 mb-1 w-full disabled:bg-gray-50' value={updateInput3} disabled />
            </div>
            <div className=''>
                <div className='flex-col items-start justify-start w-full'>
                {
                    updateLoading ? 
                    <>
                    <label className='text-xs'>نام: </label>
                    <input type="text" className='text-sm border rounded p-1 mb-1 w-full disabled:bg-gray-100' value={updateInput1} disabled />
                    </>
                    :
                    <>
                    <label className='text-xs'>نام: </label>
                    <input onChange={(e) => setUpdateInput1(e.target.value)} id="updateInput1" type="text" className='text-sm border rounded p-1 mb-1 w-full' value={updateInput1} />
                    </>
                }
                </div>
                <div className='flex-col items-start justify-start w-full'>
                {
                    updateLoading ?
                    <>
                    <label className='text-xs'>نام خانوادگی: </label>
                    <input type="text" className='text-sm border rounded p-1 mb-1 w-full disabled:bg-gray-100' value={updateInput2} disabled />
                    </>
                    :
                    <>
                    <label className='text-xs'>نام خانوادگی: </label>
                    <input onChange={(e) => setUpdateInput2(e.target.value)} id="updateInput2" type="text" className='text-sm border rounded p-1 mb-1 w-full' value={updateInput2} />
                    </>
                }
                </div>
            </div>
            {updateError ? 
            <div className='bg-[#ff7d7d38] border-[#ff7d7d] border p-4 rounded text-[#ff7d7d] text-center mb-2 mt-1'>
                خطا در بروزرسانی
            </div>
            :updateSuccess ?
            <div className='bg-green-100 border-green-500 border p-4 rounded text-green-700 text-center mb-2 mt-1'>
                بروزرسانی با موفقیت انجام شد.
            </div>
            :null
            }
            {!updateLoading ?
            <div onClick={() => updateItem(updateInput1, updateInput2, updateInput3)} className='text-sm flex flex-row items-center justify-center bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded py-2'>
                بروزرسانی
            </div>
            :
            <div className='flex flex-row items-center justify-center bg-gray-200 cursor-not-allowed text-gray-600 rounded py-2 text-sm '>
                درحال بروزرسانی
            </div>
            }
            <div className='mt-4'>
                <div className='text-center'>
                    <h4>عملیات رمز</h4>
                </div>
                <div>
                    <input id="currentpass" onChange={(e) => setCurrentPassword(e.target.value)} type="password" name="currentPassword" placeholder='رمزعبور قدیم' className='text-sm border rounded text-gray-700 p-1 w-full' />
                </div>
                <div className='flex flex-row items-center justify-between mt-1'>
                    <input id="newpass" onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='رمزعبور جدید' className='ml-1 text-sm border rounded text-gray-700 p-1 w-full' />
                    <input id="newpassrepeat" onChange={(e) => setPasswordRepeat(e.target.value)} type="password" name="repeat_password" placeholder='تکرار رمزعبور جدید' className='mr-1 text-sm border rounded text-gray-700 p-1 w-full' />
                </div>
                {passError ?
                <div className='bg-[#ff7d7d38] border-[#ff7d7d] border p-4 rounded text-[#ff7d7d] text-center mb-2 mt-1'>
                    خطا در تغییر رمز عبور
                </div> 
                :passSuccess ?
                <div className='bg-green-100 border-green-500 border p-4 rounded text-green-700 text-center mb-2 mt-1'>
                    تغییر رمز با موفقیت انجام شد.
                </div>
                : null
                }
                {passLoading ?
                <div className='text-sm bg-gray-200 cursor-not-allowed text-gray-600 mt-1 py-2 rounded text-center'>
                    درحال بروزرسانی
                </div>
                :
                <div onClick={() => changePassword(updateInput3)} className='cursor-pointer text-sm bg-green-500 hover:bg-green-600 mt-1 text-center text-white py-2 rounded'>
                    تغییر رمز عبور
                </div>
                }
            </div>
            {deleteError ?
            <div className='bg-[#ff7d7d38] border-[#ff7d7d] border p-4 rounded text-[#ff7d7d] text-center mb-2 mt-1'>
                خطا در حذف آیتم
            </div> 
            :deleteSuccess ? 
            <div className='bg-green-100 border-green-500 border p-4 rounded text-green-700 text-center mb-2 mt-1'>
                حذف با موفقیت انجام شد.
            </div>
            :null}
            {deleteLoading ?
            <div className='text-sm bg-gray-200 cursor-not-allowed text-gray-600 mt-4 py-2 rounded text-center'>
                درحال حذف
            </div>
            :
            <div onClick={() => deleteItem(updateInput3)} className='cursor-pointer hover:bg-[#ff5c5c] bg-[#ff7d7d] mt-4 border rounded border-[#ff7d7d] text-red-900 text-center py-1'>
                حذف آیتم
            </div>
            }
        </div>
        : ""
        }
         </div>
    </div>
  )
}

export default SingleAdmin