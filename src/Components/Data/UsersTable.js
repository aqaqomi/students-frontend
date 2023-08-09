import {LuUsers} from 'react-icons/lu'
import {AiOutlineCloseCircle, AiOutlinePlusSquare} from 'react-icons/ai'
import {GoChevronLeft} from 'react-icons/go'
import {BiCheck} from 'react-icons/bi'

const UsersTable = (props) => {
  return (
    <div id="usertabledata" className="bg-white rounded border border-[#ededed] text-sm min-h-[450px] max-h-[450px] overflow-y-auto">    
    <div className="flex flex-row items-center justify-between sticky top-0 left-0 right-0 bg-white border-b text-blue-700 text-lg">
        <div className="flex flex-row items-center justify-start p-6">
            <div><LuUsers size={18} /></div>
            <div className="mr-1 fw-bold">کاربران</div>
        </div>
        <div className='p-3'>
        <a href="/adduser" className="cursor-pointer hover:bg-blue-700 flex flex-row items-center justify-end bg-blue-600 rounded p-3 py-1 text-white text-xs">
            <AiOutlinePlusSquare size={22} className='ml-1' />
            افزودن
        </a>
        </div>
    </div>
    <div className='table w-full'>
        <div className='table-head flex flex-row items-center justify-between w-full border-b p-4 fw-bold text-sm'>
            <div className='w-1/4'>
                شماره همراه
            </div>
            <div className='w-2/4'>
                نام و نام خانوادگی
            </div>
            <div className='w-1/8'>
                وضعیت
            </div>
            <div className='w-1/8'>
                
            </div>
        </div>
        <div className='table-body'>
            {props.data.map(item => (
                <div key={item._id} className='flex flex-row items-center justify-between w-full border-b hover:bg-gray-50 text-sm text-gray-700 last:border-0'>
                    <div className='w-1/4 p-4 mx-1'>{item.mobile}</div>
                    <div className='w-2/4 p-4 mx-1'>{item.firstName} {item.lastName}</div>
                    <div className='w-1/8 p-4 mx-1'>{item.verified ? 
                    <BiCheck color="#23a16d" />
                    :
                    <AiOutlineCloseCircle color="#ff7d7d" />
                    }</div>
                    <a href={`/user/${item.mobile}`} className='w-1/8 p-4 mx-1 justify-end flex flex-row cursor-pointer'>
                        <GoChevronLeft />
                    </a>
                </div>
            ))}
        </div>
    </div>
</div>
  )
}

export default UsersTable