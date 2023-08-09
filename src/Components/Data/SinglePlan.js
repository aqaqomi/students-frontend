import { useEffect, useState } from 'react'
import {FiSettings} from 'react-icons/fi'
import Skeleton from 'react-loading-skeleton';
import Config from '../../Config.json'
import { useLocation } from 'react-router-dom';
import axios from 'axios'


const SinglePlan = (props) => {
    const apiPath = "/plan";
    const headers = {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "token": `${props.token}`
        }
    };

    const [item, setItem] = useState(useLocation().pathname.replace("/plan/",""));
    const [dataItem, setDataItem] = useState(null);
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

    const [uploadFile, setUploadFile] = useState(null);

    const [itemError, setItemError] = useState(false);
    const [itemLoading, setItemLoading] = useState(false);
        
    const [updateLoading, setUpdateLoading] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);


    const fetchData = async () => {
        try {
            setItemLoading(true);
            setItemError(false);
            const data = await axios.post(`${Config.API_URL}${Config.ADMIN_API}${Config.VIEW}${apiPath}`, {name: decodeURI(item)}, headers);
            setItemError(false);
            setItemLoading(false);
            setDataItem(data.data.data);
            setItem(data.data.data.name);
            setPlanName(data.data.data.name);
            setPlanDescription(data.data.data.description);
            setPlanReshte(data.data.data.reshte);
            setPlanPaye(data.data.data.paye);
            setPlanDurationDays(data.data.data.durationDays);
            setAttendedToClass(data.data.data.attendedToClasses);
            setPlanLevel(data.data.data.level);
            setPlanNeedInterview(data.data.data.needInterview);
            setFilePath(data.data.data.fileName);
            setPlanPrice(data.data.data.price);
        } catch (err) {
            setItemError(true);
            setItemLoading(false);
            setDataItem(null);
            setPlanName(null);
            setPlanDescription(null);
            setPlanReshte(null);
            setPlanPaye(null);
            setPlanDurationDays(null);
            setAttendedToClass(null);
            setPlanLevel(null);
            setPlanNeedInterview(null);
            setFilePath(null);
            setPlanPrice(null);
        }
    };
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

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
    const updateItem = async () => {
        const headers = {
            headers: {
              "Content-Type": "application/json",
              "token": `${props.token}`
            }
          };
          setUpdateLoading(true);
          setUpdateError(false);
        await axios.put(`${Config.API_URL}${Config.ADMIN_API}${Config.UPDATE}${apiPath}`, {
            currentName: decodeURI(item),
            name: planName,
            description: planDescription,
            paye: planPaye,
            reshte: planReshte,
            durationDays: planDurationDays,
            attendedToClasses: planAttendedToClass,
            level: planLevel,
            fileName: planFilePath,
            needInterview: planNeedInterview,
            price: planPrice
        }, headers)
        .then (data => {
            setUpdateLoading(false);
            setUpdateError(false);
            setUpdateSuccess(true);
            setDataItem(data.data.data);
            setItem(data.data.data.name);
            setPlanName(data.data.data.name);
            setPlanDescription(data.data.data.description);
            setPlanReshte(data.data.data.reshte);
            setPlanPaye(data.data.data.paye);
            setPlanDurationDays(data.data.data.durationDays);
            setAttendedToClass(data.data.data.attendedToClasses);
            setPlanLevel(data.data.data.level);
            setPlanNeedInterview(data.data.data.needInterview);
            setFilePath(data.data.data.fileName);
            setPlanPrice(data.data.data.price);
        })
        .catch (err =>{
            setUpdateLoading(false);
            setUpdateError(true);
            setUpdateSuccess(false);
            setDataItem(null);
            setItem(null);
            setPlanName(null);
            setPlanDescription(null);
            setPlanReshte(null);
            setPlanPaye(null);
            setPlanDurationDays(null);
            setAttendedToClass(null);
            setPlanLevel(null);
            setPlanNeedInterview(null);
            setFilePath(null);
            setPlanPrice(null);
        });
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
            await axios.post(`${Config.API_URL}${Config.ADMIN_API}${Config.DELETE}/plan`, {name: item}, headers)
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
                    عملیات برنامه
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
        :dataItem ?
        <div className='p-6'>
            <div className='flex flex-col items-start justify-start'>
                <label className='text-xs'>نام: </label>
                <input onChange={(e) => setPlanName(e.target.value)} id="planName" type="text" className='text-sm border rounded p-1 mb-1 w-full disabled:bg-gray-50' defaultValue={dataItem.name} />
            </div>
            <div className='flex flex-col items-start justify-start'>
                <label className='text-xs'>توضیحات: </label>
                <textarea onChange={(e) => setPlanDescription(e.target.value)} id="planName" type="text" className='text-sm border rounded p-1 mb-1 w-full disabled:bg-gray-50' defaultValue={dataItem.description}>
                </textarea>
            </div>
            <div className='flex flex-row items-center justify-between mb-2'>
                    <select onChange={(e) => setPlanPaye(e.target.value)} value={planPaye} className='border rounded p-1 w-full text-sm bg-white'>
                        <option value="" name="" disabled>-پایه-</option>
                        <option value="10" name="paye">دهم</option>
                        <option value="11" name="paye">یازدهم</option>
                        <option value="12" name="paye">دوازدهم</option>
                    </select>
                    <select onChange={(e) => setPlanReshte(e.target.value)} value={planReshte} className='border rounded p-1 w-full text-sm bg-white mx-1'>
                        <option value="" name="" disabled>-رشته-</option>
                        <option value="ریاضی" name="reshte">ریاضی</option>
                        <option value="تجربی" name="reshte">تجربی</option>
                        <option value="انسانی" name="reshte">انسانی</option>
                    </select>
                    <input onChange={(e) => setPlanDurationDays(e.target.value)} value={planDurationDays} type="number" placeholder='مدت به روز' className='border rounded p-1 w-full text-sm' />
                </div>
                <div className='flex flex-row items-center justify-between mb-2'>
                    <select onChange={(e) => setAttendedToClass(e.target.value)} value={planAttendedToClass} className='border rounded p-1 w-full text-sm bg-white'>
                        <option value="" name="" disabled>-کلاس تقویتی-</option>
                        <option value="true" name="attendedToClass">بله</option>
                        <option value="false" name="attendedToClass">خیر</option>
                    </select>
                    <select onChange={(e) => setPlanLevel(e.target.value)} value={planLevel} className='border rounded p-1 w-full text-sm bg-white mx-1'>
                        <option value="" name="" disabled>-سطح دوره-</option>
                        <option value="1" name="level">یک</option>
                        <option value="2" name="level">دو</option>
                        <option value="3" name="level">سه</option>
                        <option value="4" name="level">چهار</option>
                        <option value="5" name="level">پنج</option>
                        <option value="vip" name="level">VIP</option>
                    </select>
                    <select onChange={(e) => setPlanNeedInterview(e.target.value)} value={planNeedInterview} className='border rounded p-1 w-full text-sm bg-white'>
                        <option value="" name="" disabled>-نیاز به مصاحبه-</option>
                        <option value="true" name="needInterview">دارد</option>
                        <option value="false" name="needInterview">ندارد</option>
                    </select>
                </div>
                <div className='flex flex-col items-start justify-start mb-2'>
                    {planFilePath ?
                    <div className='bg-green-100 border-green-700 border rounded w-full text-green-900 mb-2 justify-center items-center text-center p-4'>
                        <a href={`${Config.API_URL}/${planFilePath}`} rel="noreferrer" target="_blank">فایل برنامه - برای مشاهده ضربه بزنید.</a>
                    </div>
                    : null}
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
                <div className='flex flex-col items-start justify-start mb-2'>
                    <input onChange={(e) => setPlanPrice(e.target.value)} id="planName" type="text" className='text-sm border rounded p-1 mb-1 w-full disabled:bg-gray-50' defaultValue={dataItem.price} />
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
                    <div onClick={() => updateItem()} className='text-sm flex flex-row items-center justify-center bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded py-2'>
                        بروزرسانی
                    </div>
                    :
                    <div className='flex flex-row items-center justify-center bg-gray-200 cursor-not-allowed text-gray-600 rounded py-2 text-sm '>
                        درحال بروزرسانی
                    </div>
                }

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
                    <div onClick={() => deleteItem(dataItem.name)} className='cursor-pointer hover:bg-[#ff5c5c] bg-[#ff7d7d] mt-4 border rounded border-[#ff7d7d] text-red-900 text-center py-1'>
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

export default SinglePlan