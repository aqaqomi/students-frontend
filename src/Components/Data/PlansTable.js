import {HiOutlineClipboardDocumentList} from 'react-icons/hi2'
import {AiOutlineCloseCircle, AiOutlinePlusSquare} from 'react-icons/ai'
import {GoChevronLeft} from 'react-icons/go'
import {BiCheck} from 'react-icons/bi'

const PlansTable = (props) => {
  return (
    <div id="usertabledata" className="bg-white rounded border border-[#ededed] text-sm min-h-[450px] max-h-[450px] overflow-y-auto">    
    <div className="flex flex-row items-center justify-between sticky top-0 left-0 right-0 bg-white border-b text-blue-700 text-lg">
        <div className="flex flex-row items-center justify-start p-6">
            <div><HiOutlineClipboardDocumentList size={18} /></div>
            <div className="mr-1 fw-bold">برنامه‌ها</div>
        </div>
        <div className='p-3'>
        <a href="/addplan" className="cursor-pointer hover:bg-blue-700 flex flex-row items-center justify-end bg-blue-600 rounded p-3 py-1 text-white text-xs">
            <AiOutlinePlusSquare size={22} className='ml-1' />
            افزودن
        </a>
        </div>
    </div>
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
                {props.data.map(item => (
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
                        <a href={`/plan/${item.name}`} className='w-full p-4 mx-1 justify-end flex flex-row cursor-pointer'>
                            <GoChevronLeft />
                        </a>
                    </div>
                ))}
            </div>
    </div>
</div>
  )
}

export default PlansTable