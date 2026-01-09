import React from '../assets/react.svg';
import Search from '../assets/search.png';
import Box from '../assets/box.png';
import Notification from '../assets/notification.png';
import Avatar from './Avatar';
import Plus from '../assets/plus.png';


export default function Header() {

  return (
    <section className="sticky top-0 z-50 bg-white justify-between items-center flex px-18 py-3 border-b border-gray-200">
        <div className='flex items-center h-9 gap-4'>
            <img src={React} alt="React Logo" className="h-9 w-9"/>
            <div className='bg-stone-100 w-80 rounded-sm flex'>
                <img src={Search} className="h-4 w-4 m-2.5"/>
                <input placeholder='Search' className='w-full'></input>
                <div className='h-full w-10'>
                </div>
            </div>
        </div>
        <div className='flex items-center h-9 gap-4'>
            <a href='#' className='border border-gray-200 py-2 px-4 h-9 font-medium rounded-sm flex items-center'>Get Invite Codes</a>
            <a href='#' className='bg-indigo-400 py-2 px-4 h-9 rounded-sm font-medium text-white flex items-center gap-2'>
              <img src={Plus} className='h-3 w-3'/>
              <p>Create</p>
            </a>
            <img src={Box} className="h-6 w-6 m-1.5"/>
            <span className='h-6 border border-gray-200'/>
            <img src={Notification} className="h-4 w-4 m-1.5"/>
            <Avatar />
        </div>
    </section>
  )
}
