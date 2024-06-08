import React from 'react'
import { useRef,useState } from 'react'


// ยังไม่ได้ใส่ฟังก์ชันส่งข้อมูล

function Popup({onClose}) {
  const inputRef = useRef(null)
  const [image,setImage] = useState("")

  const handleImageClick = () => {
    inputRef.current.click();
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    console.log(file);
    setImage(event.target.files[0]);
  }

  const handleSubmit = {}

  return (
    <div className='z-10 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center item-center'>
        <div className='m-auto w-[30rem] h-[38rem] relative px-16 py-20 rounded-3xl bg-[#CCF2F4]  '>
          <h1 className='text-3xl font-semibold mb-8 text-center'>Change image</h1>
        <img className='w-[3rem] hover:brightness-75 active:brightness-50 absolute top-5 right-5 transition ease-in-out delay-75 cursor-pointer'
        onClick={onClose}
        src='/image/cross.png'/>
        {image ? (
          <img  className='m-auto w-4/5 rounded-full object-cover aspect-square cursor-pointer hover:brightness-75 active:brightness-50 transition ease-in-out delay-75' 
          src={URL.createObjectURL(image)} 
          onClick={handleImageClick} />
        ) : (
          <img className='m-auto w-4/5 rounded-full object-cover aspect-square cursor-pointer hover:brightness-75 active:brightness-50 transition ease-in-out delay-75' 
          src="/image/profileIcon.jpg" 
          onClick={handleImageClick} />
        )
        }

        <form onSubmit={handleSubmit}>
        <input type='file' className='hidden'ref={inputRef} onChange={handleImageChange}/>
        <button type="submit" className="w-full my-[3rem] bg-[#AAAAAA]  hover:bg-[#939393] active:bg-[#7B7B7B] text-black border  py-3 px-3 rounded-full text-lg my-2" >Submit</button>
        </form>
        </div>
    </div>
  )
}

export default Popup