import { BiCommentError } from "react-icons/bi"

const ErrorLoading = () => {
  return (
    <>
        <div className='bg-white rounded border border-[#ededed] text-sm min-h-[450px] max-h-[450px] error flex flex-col items-center justify-center text-center p-6'>
            <BiCommentError size={48} color="#ff7d7d" />
            <div className='text-[#ff7d7d] text-2xl fw-bold'>خطا</div>
            <div className='text-[#ff7d7d] text-md'>دریافت اطلاعات با خطا مواجه شد! لطفا صفحه را مجددا بارگزاری نمائید.</div>
        </div>
    </>
  )
}

export default ErrorLoading