import React from 'react'
import {FiUserCheck} from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';

const TableLoading = () => {
  return (
    <>
    <div className="bg-white rounded border border-[#ededed] text-sm min-h-[450px] max-h-[450px]">
        <div className="flex flex-row items-center justify-between text-blue-700 text-lg">
            <div className="flex flex-row items-center justify-start p-6">
                <div><Skeleton width={20} /></div>
                <div className="mr-1 fw-bold">
                    <Skeleton width={80} />
                </div>
            </div>
            <div className='p-3'>
                <Skeleton width={86} height={30} baseColor='#4989ffc7' highlightColor='#6c9aff' />
            </div>
        </div>
        <hr />
        <div className='table w-full'>
            <div className='table-head flex flex-row items-center w-full border-b p-4 fw-bold text-sm'>
                <div className='w-3/6'>
                    <div className='w-3/6'><Skeleton width={120} /></div>
                </div>
                <div className='w-2/6'>
                    <div className='w-2/6'><Skeleton width={80} /></div>
                </div>
                <div className='w-1/6 justify-end flex flex-row'>
                    <Skeleton width={20} />
                </div>
            </div>
            <div className='table-body'>
                    <div className='flex flex-row items-center w-full border-b p-4 hover:bg-gray-50 text-sm text-gray-700'>
                        <div className='w-3/6'><Skeleton width={120} /></div>
                        <div className='w-2/6'><Skeleton width={80} /></div>
                        <div className='w-1/6 justify-end flex flex-row'>
                            <Skeleton width={20} />
                        </div>
                    </div>
                    <div className='flex flex-row items-center w-full border-b p-4 hover:bg-gray-50 text-sm text-gray-700'>
                        <div className='w-3/6'><Skeleton width={120} /></div>
                        <div className='w-2/6'><Skeleton width={80} /></div>
                        <div className='w-1/6 justify-end flex flex-row'>
                            <Skeleton width={20} />
                        </div>
                    </div>
                    <div className='flex flex-row items-center w-full border-b p-4 hover:bg-gray-50 text-sm text-gray-700'>
                        <div className='w-3/6'><Skeleton width={120} /></div>
                        <div className='w-2/6'><Skeleton width={80} /></div>
                        <div className='w-1/6 justify-end flex flex-row'>
                            <Skeleton width={20} />
                        </div>
                    </div>
                    <div className='flex flex-row items-center w-full border-b p-4 hover:bg-gray-50 text-sm text-gray-700'>
                        <div className='w-3/6'><Skeleton width={120} /></div>
                        <div className='w-2/6'><Skeleton width={80} /></div>
                        <div className='w-1/6 justify-end flex flex-row'>
                            <Skeleton width={20} />
                        </div>
                    </div>
                    <div className='flex flex-row items-center w-full border-b p-4 hover:bg-gray-50 text-sm text-gray-700'>
                        <div className='w-3/6'><Skeleton width={120} /></div>
                        <div className='w-2/6'><Skeleton width={80} /></div>
                        <div className='w-1/6 justify-end flex flex-row'>
                            <Skeleton width={20} />
                        </div>
                    </div>
                    <div className='flex flex-row items-center w-full p-4 hover:bg-gray-50 text-sm text-gray-700'>
                        <div className='w-3/6'><Skeleton width={120} /></div>
                        <div className='w-2/6'><Skeleton width={80} /></div>
                        <div className='w-1/6 justify-end flex flex-row'>
                            <Skeleton width={20} />
                        </div>
                    </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default TableLoading