import { useState } from "react";
import {AiOutlinePlusSquare} from 'react-icons/ai'
import {PiWarningBold} from 'react-icons/pi'
import {BiCommentCheck} from 'react-icons/bi'
import axios from "axios";
import Config from '../../Config.json'

const AddAdmin = (props) => {
    const [addError, setAddError] = useState(false);
    const [add2Error, setAdd2Error] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const newData = async () => {
        const headers = {
            headers: {
              "Content-Type": "application/json",
              "token": `${props.token}`
            }
          };
        const input1 = document.querySelector('#input1');
        const input2 = document.querySelector('#input2');
        const input3 = document.querySelector('#input3');
        const input4 = document.querySelector('#input4');
        if (!input1.value) {
            input1.classList.add('border-red-500');
        } else {
            input1.classList.remove('border-red-500')
        }
        if (!input2.value) {
            input2.classList.add('border-red-500')
        } else {
            input2.classList.remove('border-red-500')
        }
        if (!input3.value) {
            input3.classList.add('border-red-500')
        } else {
            input3.classList.remove('border-red-500')
        }
        if (!input4.value) {
            input4.classList.add('border-red-500')
        } else {
            input4.classList.remove('border-red-500')
        }
        if (input1.value && input2.value && input3.value && input4.value) {
            setAddError(false);
            setAddLoading(true);
            setAdd2Error(false);
            axios.post(`${Config.API_URL}${Config.ADMIN_API}${Config.CREATE}/admin`, {
                firstName: input1.value,
                lastName: input2.value,
                username: input3.value,
                password: input4.value
            }, headers)
            .then (res => {
                setAddLoading(false);
                setAddError(false);
                setAddSuccess(true);
                setTimeout(() => {
                    setAddSuccess(false);
                }, 2000);
            })
            .catch(err => {
                setAddLoading(false);
                setAdd2Error(true);
            });
            console.log(input1.value + ' ' + input2.value + ' ' + input3.value + ' ' + input4.value);
        } else {
            setAddError(true);
        }
      };
  return (
    <div className='p-8 h-full'>
        <div className='bg-white border rounded md:max-w-[50%] md:mx-auto'>
        <div className='modal-head flex flex-row items-center justify-start p-4'>
            <AiOutlinePlusSquare size={24} />
            <div className='fw-bold text-md mr-2'>
                ایجاد مدیر جدید
            </div>
        </div>
        <hr />
        <div className='p-6'>
            {addError ?
            <div className='bg-[#ff7d7d38] border-[#ff7d7d] border p-4 rounded text-gray-500 text-sm mb-4 flex flex-row items-center justify-start'>
                <PiWarningBold size={34} color="#ff7d7d" />
                <p className='mr-4 text-[#ff7d7d]'>
                لطفا اطلاعات درخواستی را تکمیل نمایید.
                </p>
            </div>
            :add2Error ?
            <div className='bg-[#ff7d7d38] border-[#ff7d7d] border p-4 rounded text-gray-500 text-sm mb-4 flex flex-row items-center justify-start'>
                <PiWarningBold size={34} color="#ff7d7d" />
                <p className='mr-4 text-[#ff7d7d]'>
                    خطایی در ارسال داده بوجود آمد و عملیات متوقف گردید. در صورت تکرار این موضوع با مدیر پنل تماس بگیرید.
                </p>
            </div>
            :addSuccess ?
            <div className='bg-[#7bffbd38] border-[#7bffbdff] border p-4 rounded text-gray-500 text-sm mb-4 flex flex-row items-center justify-start'>
                <BiCommentCheck size={34} color="#00b45aff" />
                <p className='mr-4 text-[#00b45aff]'>
                    عملیات با موفقیت انجام شد.
                </p>
            </div>
            :
            <div className='bg-gray-50 p-4 rounded text-gray-500 text-sm mb-4 flex flex-row items-center justify-center'>
                <PiWarningBold size={34} color="#808080a8" />
                <p className='mr-4'>
                برای ایجاد یک مدیر جدید فرم زیر را تکمیل نمایید.
                </p>
            </div>
            }
            <div className='flex flex-row items-center justify-between mb-2'>
                <input id="input1" type="text" placeholder='نام' className='border rounded p-1 w-full mx-1 text-sm' />
                <input id="input2" type="text" placeholder='نام خانوادگی' className='border rounded p-1 w-full mx-1 text-sm' />
            </div>
            <div className='flex flex-row items-center justify-between'>
                <input id="input3"type="text" placeholder='نام کاربری' className='border rounded p-1 w-full mx-1 text-sm' />
                <input id="input4" type="password" placeholder='رمز عبور' className='border rounded p-1 w-full mx-1 text-sm' />
            </div>
            <div className='flex flex-row justify-between items-center mt-6 text-sm'>
                <a href="/" className='bg-gray-100 px-3 py-1 rounded text-gray-500 fw-bold hover:cursor-pointer hover:bg-gray-200'>
                    لغو و برگشت
                </a>
                {!addLoading ?
                <div onClick={newData} className='bg-green-500 text-white px-3 py-1 rounded fw-bold hover:bg-green-600 hover:cursor-pointer'>
                    ثبت و ایجاد
                </div>
                :
                <div className='bg-green-500 text-white px-3 py-1 rounded fw-bold hover:bg-green-600 hover:cursor-not-allowed'>
                    در حال ارسال...
                </div>
                }
            </div>
        </div>
        </div>
    </div>
  )
}

export default AddAdmin