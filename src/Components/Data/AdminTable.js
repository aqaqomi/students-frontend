import {FiUserCheck} from 'react-icons/fi'
import {AiOutlinePlusSquare} from 'react-icons/ai'
import {GoChevronLeft} from 'react-icons/go'

const DataTable = (props) => {
  return (
    <div id="tabledata" className="bg-white rounded border border-[#ededed] text-sm min-h-[450px] max-h-[450px] overflow-y-auto">    
        <div className="flex flex-row items-center justify-between sticky top-0 left-0 right-0 bg-white text-blue-700 text-lg border-b">
            <div className="flex flex-row items-center justify-start p-6">
                <div><FiUserCheck size={18} /></div>
                <div className="mr-1 fw-bold">مدیران</div>
            </div>
            <div className='p-3'>
            <a href="/addadmin" className="cursor-pointer hover:bg-blue-700 flex flex-row items-center justify-end bg-blue-600 rounded p-3 py-1 text-white text-xs">
                <AiOutlinePlusSquare size={22} className='ml-1' />
                افزودن
            </a>
            </div>
        </div>
        <div className='table w-full'>
            <div className='table-head flex flex-row items-center w-full border-b p-4 fw-bold text-sm'>
                <div className='w-3/6'>
                    نام و نام خانوادگی
                </div>
                <div className='w-2/6'>
                    نام کاربری
                </div>
                <div className='w-1/6'>
                    
                </div>
            </div>
            <div className='table-body'>
                {props.data.map(item => (
                    <div key={item._id} className='flex flex-row items-center w-full border-b hover:bg-gray-50 text-sm text-gray-700 last:border-0'>
                        <div className='w-3/6 p-4 mx-1'>{item.firstName} {item.lastName}</div>
                        <div className='w-2/6 p-4 mx-1'>{item.username}</div>
                        <a href={`/admin/${item.username}`} className='w-1/6 p-4 mx-1 justify-end flex flex-row cursor-pointer'>
                            <GoChevronLeft />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default DataTable