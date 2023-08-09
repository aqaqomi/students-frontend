import {FiUserCheck} from 'react-icons/fi'
import {AiOutlinePlusSquare} from 'react-icons/ai'
import {PiSmileyXEyes} from 'react-icons/pi'

const NoData = (props) => {
  return (
    <div id="nodata" className="bg-white rounded border border-[#ededed] text-sm min-h-[450px] max-h-[450px]">    
        <div className="flex flex-row items-center justify-between text-blue-700 text-lg">
            <div className="flex flex-row items-center justify-start p-6">
                <div><FiUserCheck size={18} /></div>
                <div className="mr-1 fw-bold">مدیران</div>
            </div>
            <div className='p-3'>
            <a href={props.addUrl} className="cursor-pointer hover:bg-blue-700 flex flex-row items-center justify-end bg-blue-600 rounded p-3 py-1 text-white text-xs">
                <AiOutlinePlusSquare size={22} className='ml-1' />
                افزودن
            </a>
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
  )
}

export default NoData