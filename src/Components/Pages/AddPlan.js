import { useState } from "react";
import {AiOutlinePlusSquare} from 'react-icons/ai'
import {PiWarningBold} from 'react-icons/pi'
import {BiCommentCheck} from 'react-icons/bi'
import axios from "axios";
import Config from '../../Config.json'

const AddPlan = (props) => {
    const [addError, setAddError] = useState(false);
    const [add2Error, setAdd2Error] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);

    
    const [planName, setPlanName] = useState(null);
    const [planDescription, setPlanDescription] = useState(null);
    const [planReshte, setPlanReshte] = useState(null);
    const [planPaye, setPlanPaye] = useState(null);
    const [planDurationDays, setPlanDurationDays] = useState(null);
    const [planAttendedToClass, setAttendedToClass] = useState(null);
    const [planLevel, setPlanLevel] = useState(null);
    const [planNeedInterview, setPlanNeedInterview] = useState(null);
    const [planFilePath, setFilePath] = useState(null);
    const [planPrice, setPlanPrice] = useState(null);

    const newData = async () => {
        const headers = {
            headers: {
              "Content-Type": "application/json",
              "token": `${props.token}`
            }
          };
        
        if (planName && planReshte && planPaye && planDurationDays && planAttendedToClass && planLevel && planNeedInterview && planPrice && planFilePath) {
            setAddError(false);
            setAddLoading(true);
            setAdd2Error(false);
            axios.post(`${Config.API_URL}${Config.ADMIN_API}${Config.CREATE}/plan`, 
                {
                    "name": planName,
                    "description": planDescription,
                    "paye": planPaye,
                    "reshte": planReshte,
                    "durationDays": planDurationDays,
                    "attendedToClasses": planAttendedToClass,
                    "level": planLevel,
                    "fileName": planFilePath,
                    "needInterview": planNeedInterview,
                    "price": planPrice
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
        } else {
            setAddError(true);
        }
      };

      const fileUpload = async (e) => {
        setUploadFile(null);
        const formData = new FormData();
        formData.append("files", e);
        await axios.post(`${Config.API_URL}${Config.ADMIN_API}/files/upload`, formData, {headers: {
            "Content-Type": "multipart/form-data",
            "token": `${props.token}`
            }})
            .then((res) => {
                setUploadFile(true);
                setFilePath(res.data.path);
            })
            .catch(err => {
                setUploadFile(false);
            });
      };
      
  return (
    <div className='p-8 h-full'>
        <div className='bg-white border rounded md:max-w-[50%] md:mx-auto'>
            <div className='modal-head flex flex-row items-center justify-start p-4'>
                <AiOutlinePlusSquare size={24} />
                <div className='fw-bold text-md mr-2'>
                    ایجاد برنامه جدید
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
                <div className='bg-gray-50 p-4 rounded text-gray-500 text-sm mb-4 flex flex-col items-center justify-center'>
                    <PiWarningBold size={34} color="#808080a8" />
                    <p className='mr-4'>
                    برای ایجاد یک برنامه جدید فرم زیر را تکمیل نمایید.
                    </p>
                    <p className='mr-4'>
                        دقت داشته باشید که برنامه بدون فایل مربوطه امکان بارگزاری ندارد و تمامی فیلدها برای ایجاد برنامه الزامیست. 
                    </p>
                    <p className='mr-4'>
                        پس از انتخاب فایل برنامه، کمی صبر کنید تا تاییدیه بارگزاری به شما نمایش داده شود. شما امکان افزودن یک فایل را خواهید داشت.
                    </p>
                </div>
                }
                <div className='flex flex-row items-center justify-between mb-2'>
                    <input onChange={(e) => setPlanName(e.target.value)} type="text" placeholder='عنوان برنامه' className='border rounded p-1 w-full text-sm' />
                </div>
                <div className='flex flex-row items-center justify-between mb-2'>
                    <textarea onChange={(e) => setPlanDescription(e.target.value)} className='border rounded p-1 w-full text-sm' placeholder="توضیحات برنامه">
                    </textarea>
                </div>
                <div className='flex flex-row items-center justify-between mb-2'>
                    <select onChange={(e) => setPlanPaye(e.target.value)} className='border rounded p-1 w-full text-sm bg-white'>
                        <option value="" name="" disabled selected>-پایه-</option>
                        <option value="10" name="paye">دهم</option>
                        <option value="11" name="paye">یازدهم</option>
                        <option value="12" name="paye">دوازدهم</option>
                    </select>
                    <select onChange={(e) => setPlanReshte(e.target.value)} className='border rounded p-1 w-full text-sm bg-white mx-1'>
                        <option value="" name="" disabled selected>-رشته-</option>
                        <option value="ریاضی" name="reshte">ریاضی</option>
                        <option value="تجربی" name="reshte">تجربی</option>
                        <option value="انسانی" name="reshte">انسانی</option>
                    </select>
                    <input onChange={(e) => setPlanDurationDays(e.target.value)} type="number" placeholder='مدت به روز' className='border rounded p-1 w-full text-sm' />
                </div>
                <div className='flex flex-row items-center justify-between mb-2'>
                    <select onChange={(e) => setAttendedToClass(e.target.value)} className='border rounded p-1 w-full text-sm bg-white'>
                        <option value="" name="" disabled selected>-کلاس تقویتی-</option>
                        <option value="true" name="attendedToClass">بله</option>
                        <option value="false" name="attendedToClass">خیر</option>
                    </select>
                    <select onChange={(e) => setPlanLevel(e.target.value)} className='border rounded p-1 w-full text-sm bg-white mx-1'>
                        <option value="" name="" disabled selected>-سطح دوره-</option>
                        <option value="1" name="level">یک</option>
                        <option value="2" name="level">دو</option>
                        <option value="3" name="level">سه</option>
                        <option value="4" name="level">چهار</option>
                        <option value="5" name="level">پنج</option>
                        <option value="vip" name="level">VIP</option>
                    </select>
                    <select onChange={(e) => setPlanNeedInterview(e.target.value)} className='border rounded p-1 w-full text-sm bg-white'>
                        <option value="" name="" disabled selected>-نیاز به مصاحبه-</option>
                        <option value="true" name="needInterview">دارد</option>
                        <option value="false" name="needInterview">ندارد</option>
                    </select>
                </div>
                <div className='flex flex-col items-center justify-between mb-2'>
                        {uploadFile === true ?
                        <div className="flex flex-row text-center items-center justify-center bg-green-100 border-green-700 text-green-900 w-full p-3 border rounded mb-2">
                            بارگزاری فایل با موفقیت انجام شد.
                        </div>
                        :uploadFile === false ?
                            <div className="flex flex-row text-center items-center justify-center bg-red-100 border-red-700 text-red-900 w-full p-3 border rounded mb-2">
                                خطایی در بارگزاری فایل پیش امده است.
                            </div>
                        : null
                        }
                        <input onChange={(e) => fileUpload(e.target.files[0])} name="planFile" id='files' type="file" className='border rounded p-1 w-full text-sm' />
                </div>
                <div className='flex flex-row items-center justify-between mb-2'>
                    <input onChange={(e) => setPlanPrice(e.target.value)} type="text" placeholder='قیمت برنامه به تومان' className='border rounded p-1 w-full text-sm' />
                </div>
                <div className='flex flex-row justify-between items-center mt-6 text-sm'>
                    <a href="/" className='bg-gray-100 px-3 py-1 rounded text-gray-500 fw-bold hover:cursor-pointer hover:bg-gray-200'>
                        لغو و برگشت
                    </a>
                    {!addLoading ?
                        uploadFile === true ?
                            <div onClick={newData} className='bg-green-500 text-white px-3 py-1 rounded fw-bold hover:bg-green-600 hover:cursor-pointer'>
                                ثبت و ایجاد
                            </div>
                        :
                            <div className='bg-green-500 text-white px-3 py-1 rounded fw-bold hover:bg-green-600 hover:cursor-pointer'>
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

export default AddPlan