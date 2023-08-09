import { useEffect, useState } from 'react';
import axios from 'axios';
import Config from "../Config.json";
import {BiCommentError, BiCommentCheck, BiCheck} from 'react-icons/bi'
import {AiOutlinePlusSquare, AiOutlineCloseCircle} from 'react-icons/ai'
import {GoChevronLeft} from 'react-icons/go'
import {HiOutlineClipboardDocumentList} from 'react-icons/hi2'
import {PiSmileyXEyes, PiWarningBold} from 'react-icons/pi'
import {FiSettings} from 'react-icons/fi'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const Plans = (props) => {
    const [data, setData] = useState(null);
    const [loading, isLoading] = useState(true);
    const [err, setErr] = useState(null);

    const [addError, setAddError] = useState(false);
    const [add2Error, setAdd2Error] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [addLoading, setAddLoading] = useState(false);

    const [item, setItem] = useState(null);
    const [itemError, setItemError] = useState(false);
    const [itemLoading, setItemLoading] = useState(false);

    const [updateInput1, setUpdateInput1] = useState(null);
    const [updateInput2, setUpdateInput2] = useState(null);
    const [updateInput3, setUpdateInput3] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);

    const [currentPassword, setCurrentPassword] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwrdRepeat, setPasswordRepeat] = useState(null);
    const [passSuccess, setPassSuccess] = useState(null);
    const [passError, setPassError] = useState(null);
    const [passLoading, setPassLoading] = useState(null);
    
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const headers = {
        headers: {
          "Content-Type": "application/json",
          "token": `${props.token}`
        }
      };
      const fetchData = async () => {
          try {
              const response = await axios.get(`${Config.API_URL}${Config.ADMIN_API}${Config.VIEW}/plans`, headers);
              setData(response.data.data);
              isLoading(false);
              setErr(false);
          }
          catch (e) {
              setData(null);
              isLoading(false);
              setErr(true);
          }
      };
      useEffect(() => {
        fetchData();
      },[setData]);
      const newUserData = async () => {
        const headers = {
            headers: {
              "Content-Type": "application/json",
              "token": `${props.token}`
            }
          };
        const input1 = document.querySelector('#inputuser1');
        const input4 = document.querySelector('#inputuser4');
        if (!input1.value) {
            input1.classList.add('border-red-500');
        } else {
            input1.classList.remove('border-red-500')
        }
        if (!input4.value) {
            input4.classList.add('border-red-500')
        } else {
            input4.classList.remove('border-red-500')
        }
        if (input1.value && input4.value) {
            setAddError(false);
            setAddLoading(true);
            setAdd2Error(false);
            axios.post(`${Config.API_URL}${Config.ADMIN_API}${Config.CREATE}/plan`, {
                mobile: input1.value,
                password: input4.value
            }, headers)
            .then (res => {
                setAddLoading(false);
                setAddError(false);
                setAddSuccess(true);
                setTimeout(() => {
                    setAddSuccess(false);
                    showAddModalPlans();
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
      const showAddModalPlans = () => {
        const modal = document.querySelector('#modal-plan-add');
        const input1 = document.querySelector('#input1');
        const input2 = document.querySelector('#input2');
        const input3 = document.querySelector('#input3');
        const input4 = document.querySelector('#input4');
        input1.value = null;
        input2.value = null;
        input3.value = null;
        input4.value = null;
        input1.classList.remove('border-red-500')
        input2.classList.remove('border-red-500')
        input3.classList.remove('border-red-500')
        input4.classList.remove('border-red-500')
        setAddError(false);
        setAddLoading(false);
        setAdd2Error(false);
        setAddSuccess(false);
        if (modal.classList.contains('hidden')) {
            document.querySelector('#plantabledata').classList.add('blur-sm');
            document.querySelector('#modal-plan-add').classList.add('visible');
            document.querySelector('#modal-plan-add').classList.remove('hidden');
            if (document.querySelector('#noplandata')) {
                document.querySelector('#noplandata').classList.add('blur-sm');
            }
        } else {
            document.querySelector('#plantabledata').classList.remove('blur-sm');
            document.querySelector('#modal-plan-add').classList.add('hidden');
            document.querySelector('#modal-plan-add').classList.remove('visible');
            if (document.querySelector('#noplandata')) {
                document.querySelector('#noplandata').classList.remove('blur-sm');
            }
        }
      };
      const viewPlanData = async (data) => {
        setPassError(false);
        setPassSuccess(false);
        setUpdateSuccess(false);
        setDeleteLoading(false);
        setDeleteError(false);
        setDeleteSuccess(false);
        const headers = {
            headers: {
              "Content-Type": "application/json",
              "token": `${props.token}`
            }
          };
        const modal = document.querySelector('#plan-item-data');
        if (modal.classList.contains('hidden')) {
            document.querySelector('#plantabledata').classList.add('blur-sm');
            document.querySelector('#plan-item-data').classList.add('visible');
            document.querySelector('#plan-item-data').classList.remove('hidden');
            setItemError(false);
            setItemLoading(true);
            await axios.post(`${Config.API_URL}${Config.ADMIN_API}${Config.VIEW}/plan`, {name: data.name}, headers)
            .then (response => {
                console.log(response.data.data);
                setItemError(false);
                setItemLoading(false);
                setItem(response.data.data);
                setUpdateInput1(response.data.data.firstName)
                setUpdateInput2(response.data.data.lastName)
                setUpdateInput3(response.data.data.mobile)
            })
            .catch (err => {
                setItemError(true);
                setItemLoading(false);
                setItem(null);
            });
        } else {
            setUpdateInput1(null);
            setUpdateInput2(null);
            setUpdateInput3(null);
            document.querySelector('#plantabledata').classList.remove('blur-sm');
            document.querySelector('#plan-item-data').classList.add('hidden');
            document.querySelector('#plan-item-data').classList.remove('visible');
        }
      };
      const updateUser = async () => {
        const headers = {
            headers: {
              "Content-Type": "application/json",
              "token": `${props.token}`
            }
          };
          setUpdateLoading(true);
          setUpdateError(false);
        await axios.put(`${Config.API_URL}${Config.ADMIN_API}${Config.UPDATE}/plan`, {mobile: updateInput3, firstName: updateInput1, lastName: updateInput2}, headers)
        .then (response => {
            setUpdateLoading(false);
            setUpdateError(false);
            setUpdateInput1(response.data.data.firstName);
            setUpdateInput2(response.data.data.lastName);
            setUpdateInput3(response.data.data.mobile);
            setUpdateSuccess(true);
        })
        .catch (err =>{
            setUpdateLoading(false);
            setUpdateError(true);
            setUpdateSuccess(false);
        });
        console.log(updateInput1);
        console.log(updateInput2);
        console.log(updateInput3);
      };
      const changePassword = async (data) => {
        setPassSuccess(false);
        setPassError(false);
        setPassLoading(true);
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
        if (data && currentPassword && password && passwrdRepeat && currentpass.value && newpass.value && newpassrepeat.value) {
            axios.put(`${Config.API_URL}${Config.ADMIN_API}${Config.CHANGE_PASS}/plan`, {
                mobile: data,
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
      const deleteItem = async (data) => {
        const headers = {
            headers: {
              "Content-Type": "application/json",
              "token": `${props.token}`
            }
        };
        
        setDeleteLoading(true);
        setDeleteError(false);
        setDeleteSuccess(false);
        if (data !== "system") {
            await axios.post(`${Config.API_URL}${Config.ADMIN_API}${Config.DELETE}/plan`, {mobile: data}, headers)
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
    <>
    {loading ?
    <>
    <div className="bg-white rounded border border-[#ededed] text-sm min-h-[440px] max-h-[440px]">
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-start p-6 text-blue-700 text-lg">
                <div><HiOutlineClipboardDocumentList size={18} /></div>
                <div className="mr-1 fw-bold">برنامه‌ها</div>
            </div>
            <div className='p-3'>
                <Skeleton width={86} height={30} baseColor='#4989ffc7' highlightColor='#6c9aff' />
            </div>
        </div>
        <hr />
        <div className='table w-full'>
            <div className='table-head flex flex-row items-center w-full border-b p-4 fw-bold text-sm'>
            <div className='w-full'>
                    نام
                </div>
                <div className='w-full'>
                    پایه
                </div>
                <div className='w-full'>
                    رشته
                </div>
                <div className='w-full'>
                    مدت
                </div>
                <div className='w-full'>
                    کلاس تقویتی
                </div>
                <div className='w-full'>
                    برنامه
                </div>
                <div className='w-full'>
                    نیاز به مصاحبه
                </div>
                <div className='w-full'>
                    قیمت
                </div>
                <div className='w-full'>
                    
                </div>
            </div>
            <div className='table-body'>
                    <div className='flex flex-row items-center w-full border-b p-4 hover:bg-gray-50 text-sm text-gray-700'>
                        <div className='w-full'><Skeleton width={120} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'>
                            <Skeleton width={20} />
                        </div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'>
                            <Skeleton width={20} />
                        </div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full text-end'><Skeleton width={20} /></div>
                    </div>
                    <div className='flex flex-row items-center w-full border-b p-4 hover:bg-gray-50 text-sm text-gray-700'>
                        <div className='w-full'><Skeleton width={120} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'>
                            <Skeleton width={20} />
                        </div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'>
                            <Skeleton width={20} />
                        </div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full text-end'><Skeleton width={20} /></div>
                    </div>
                    <div className='flex flex-row items-center w-full border-b p-4 hover:bg-gray-50 text-sm text-gray-700'>
                        <div className='w-full'><Skeleton width={120} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'>
                            <Skeleton width={20} />
                        </div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'>
                            <Skeleton width={20} />
                        </div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full text-end'><Skeleton width={20} /></div>
                    </div>
                    <div className='flex flex-row items-center w-full border-b p-4 hover:bg-gray-50 text-sm text-gray-700'>
                        <div className='w-full'><Skeleton width={120} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'>
                            <Skeleton width={20} />
                        </div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'>
                            <Skeleton width={20} />
                        </div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full text-end'><Skeleton width={20} /></div>
                    </div>
                    <div className='flex flex-row items-center w-full border-b p-4 hover:bg-gray-50 text-sm text-gray-700'>
                        <div className='w-full'><Skeleton width={120} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'>
                            <Skeleton width={20} />
                        </div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'>
                            <Skeleton width={20} />
                        </div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full'><Skeleton width={80} /></div>
                        <div className='w-full text-end'><Skeleton width={20} /></div>
                    </div>
            </div>
        </div>
    </div>
    </>
    :err ?
    <>
        <div className='bg-white rounded border border-[#ededed] text-sm min-h-[440px] max-h-[440px] error flex flex-col items-center justify-center text-center p-6'>
            <BiCommentError size={48} color="#ff7d7d" />
            <div className='text-[#ff7d7d] text-2xl fw-bold'>خطا</div>
            <div className='text-[#ff7d7d] text-md'>دریافت اطلاعات با خطا مواجه شد! لطفا صفحه را مجددا بارگزاری نمائید.</div>
        </div>
    </>
    :data && data.length > 0 ?
    <div id="plantabledata" className="bg-white rounded border border-[#ededed] text-sm min-h-[440px] max-h-[440px] overflow-y-auto">    
        <div className="flex flex-row items-center justify-between sticky top-0 left-0 right-0 bg-white border-b">
            <div className="flex flex-row items-center justify-start p-6 text-blue-700 text-lg">
                <div><HiOutlineClipboardDocumentList size={18} /></div>
                <div className="mr-1 fw-bold">برنامه‌ها</div>
            </div>
            <div className='p-3'>
            <div onClick={showAddModalPlans} className="cursor-pointer hover:bg-blue-700 flex flex-row items-center justify-end bg-blue-600 rounded p-3 py-1 text-white text-xs">
                <AiOutlinePlusSquare size={22} className='ml-1' />
                افزودن
            </div>
            </div>
        </div>
        <div className='table w-full'>
            <div className='table-head flex flex-row items-center justify-between w-full border-b p-4 fw-bold text-sm'>
                <div className='w-full'>
                    نام
                </div>
                <div className='w-full'>
                    پایه
                </div>
                <div className='w-full'>
                    رشته
                </div>
                <div className='w-full'>
                    مدت
                </div>
                <div className='w-full'>
                    کلاس تقویتی
                </div>
                <div className='w-full'>
                    برنامه
                </div>
                <div className='w-full'>
                    نیاز به مصاحبه
                </div>
                <div className='w-full'>
                    قیمت
                </div>
                <div className='w-full'>
                    
                </div>
            </div>
            <div className='table-body'>
                {data.map(item => (
                    <div key={item._id} className='flex flex-row items-center justify-between w-full border-b hover:bg-gray-50 text-sm text-gray-700'>
                        <div className='w-full p-4 mx-1'>{item.name}</div>
                        <div className='w-full p-4 mx-1'>{item.paye}</div>
                        <div className='w-full p-4 mx-1'>{item.reshte}</div>
                        <div className='w-full p-4 mx-1'>{item.durationDays} روزه</div>
                        <div className='w-full p-4 mx-1'>{item.attendedToClasses ? 
                        <BiCheck color="#23a16d" />
                        :
                        <AiOutlineCloseCircle color="#ff7d7d" />
                        }</div>
                        <div className='w-full p-4 mx-1'>{item.level}</div>
                        <div className='w-full p-4 mx-1'>{item.needInterview ? 
                        <BiCheck color="#23a16d" />
                        :
                        <AiOutlineCloseCircle color="#ff7d7d" />
                        }</div>
                        <div className='w-full p-4 mx-1'>{item.price}</div>
                        <div onClick={() => viewPlanData(item)} className='w-full p-4 mx-1 justify-end flex flex-row cursor-pointer'>
                            <GoChevronLeft />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    :
    <div id="noplandata" className="bg-white rounded border border-[#ededed] text-sm min-h-[440px] max-h-[440px]">    
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-start p-6">
                <div><HiOutlineClipboardDocumentList size={18} /></div>
                <div className="mr-1 fw-bold">برنامه‌ها</div>
            </div>
            <div className='p-3'>
            <div className="flex flex-row items-center justify-end bg-blue-600 rounded p-3 py-1 text-white text-xs">
                <AiOutlinePlusSquare size={22} className='ml-1' />
                افزودن
            </div>
            </div>
        </div>
        <hr />
        <div className='h-[350px] flex flex-col items-center justify-center'>
            <PiSmileyXEyes size={48} color="#ddd" />
            <div className='text-[#ddd] text-2xl fw-bold'>
                بی‌نتیجه
            </div>
            <div className='text-[#ddd] text-md'>
                متاسفانه داده‌ای پیدا نشد!
            </div>
        </div>
    </div>
    }
    <div id="modal-plan-add" className='hidden rounded transition-all bg-white shadow shadow-md border border-[#ececec] fixed w-full h-full top-[50px] right-0 z-40'>
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
            <div className='bg-gray-50 p-4 rounded text-gray-500 text-sm mb-4 flex flex-row items-center justify-center'>
                <PiWarningBold size={34} color="#808080a8" />
                <p className='mr-4'>
                برای ایجاد یک برنامه جدید فرم زیر را تکمیل نمایید.
                </p>
            </div>
            }
            <div className='flex flex-row items-center justify-between mb-2'>
                <input id="inputuser1" type="text" placeholder='نام برنامه' className='border rounded p-1 w-full mx-1 text-sm' />
            </div>
            <div className='flex flex-row items-center justify-between'>
                <select className='border rounded p-1 w-full mx-1 text-sm'>
                    <option value="" name="" disabled selected>-رشته-</option>
                    <option value="ریاضی" name="reshte">ریاضی</option>
                    <option value="تجربی" name="reshte">تجربی</option>
                    <option value="انسانی" name="reshte">انسانی</option>
                </select>
                <select className='border rounded p-1 w-full mx-1 text-sm'>
                    <option value="" name="" disabled selected>-پایه-</option>
                    <option value="10" name="paye">دهم</option>
                    <option value="11" name="paye">یازدهم</option>
                    <option value="12" name="paye">دوازدهم</option>
                </select>
                <input id="inputuser4" type="password" placeholder='رشته' className='border rounded p-1 w-full mx-1 text-sm' />
                <input id="inputuser4" type="password" placeholder='پایه' className='border rounded p-1 w-full mx-1 text-sm' />
            </div>
            <div className='flex flex-row justify-between items-center mt-6 text-sm'>
                <div onClick={showAddModalPlans} className='bg-gray-100 px-3 py-1 rounded text-gray-500 fw-bold hover:cursor-pointer hover:bg-gray-200'>
                    لغو و برگشت
                </div>
                {!addLoading ?
                <div onClick={newUserData} className='bg-green-500 text-white px-3 py-1 rounded fw-bold hover:bg-green-600 hover:cursor-pointer'>
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
    <div id="plan-item-data" className='hidden rounded transition-all bg-white shadow shadow-md border border-[#ececec] fixed w-full h-full top-[50px] right-0 z-40'>
        <div className='modal-head flex flex-row items-center justify-between p-4'>
            <div className='flex flex-row items-center justify-center'>
                <FiSettings size={24} />
                <div className='fw-bold text-md mr-2'>
                    عملیات برنامه‌ها
                </div>
            </div>
            <div onClick={viewPlanData}>
                <AiOutlineCloseCircle size={24} color="#2e2e2e" />
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
        </div>
        :item ?
        <div className='p-6'>
            <div className='flex flex-row items-center justify-center'>
                <input onChange={(e) => setUpdateInput3(e.target.value)} id="updateInput3" type="text" className='text-sm border rounded p-1 mb-1 w-full disabled:bg-gray-50' value={updateInput3} disabled />
            </div>
            <div className='flex flex-row items-center justify-center'>
                {
                    updateLoading ? 
                    <input type="text" className='text-sm border rounded p-1 ml-1 mb-1 w-full disabled:bg-gray-100' value={updateInput1} disabled />
                    :
                    <input onChange={(e) => setUpdateInput1(e.target.value)} id="updateInput1" type="text" className='text-sm border rounded p-1 mb-1 ml-1 w-full' placeholder='نام' value={updateInput1} />
                }

                {
                    updateLoading ?
                    <input type="text" className='text-sm border rounded p-1 mr-1 mb-1 w-full disabled:bg-gray-100' value={updateInput2} disabled />
                    :
                    <input onChange={(e) => setUpdateInput2(e.target.value)} id="updateInput2" type="text" className='text-sm border rounded p-1 mb-1 mr-1 w-full' placeholder='نام خانوادگی' value={updateInput2} />
                }
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
            <div onClick={() => updateUser(updateInput1, updateInput2, updateInput3)} className='text-sm flex flex-row items-center justify-center bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded py-2'>
                بروزرسانی
            </div>
            :
            <div className='flex flex-row items-center justify-center bg-gray-200 cursor-not-allowed text-gray-600 rounded py-2 text-sm '>
                درحال بروزرسانی
            </div>
            }
            <div className='mt-4'>
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
    </>
  )
}

export default Plans