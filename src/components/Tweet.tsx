import Avatar from './Avatar';
import Heart from '../assets/heart_b.png';
import Share from '../assets/share.png';
import Fanion from '../assets/fanion.png';
import Commentaire from '../assets/commentaire.png';
import { useState } from 'react';

export default function Tweet() {
    const [count, setCount] = useState(0);

    const handleLike = () => {
        setCount(count + 1);
    };


  return (
    <section className='bg-white w-170 h-70 flex p-2'>
        <div className='mr-2'>
            <Avatar/>
        </div>
        <div className='flex flex-col pt-1 w-full'>
            <div className='flex text-base items-center'>
                <p className='font-bold mr-2'>Sahil Hood 👋</p>
                <div className='flex gap-2 opacity-70 text-sm'>
                    <p>@florinpop17</p>
                    <span>•</span>
                    <p>5d</p>
                </div>
            </div>
            <div className='h-full py-1.5 flex flex-col gap-3 text-left'>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </p>
                <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div className='flex gap-8 content-left'>
                <div className='flex gap-3 items-center'>
                    <button className='' onClick={handleLike}><img src={Heart} alt='heart' className='h-5 w-5'/></button>
                    <span>{count}</span>
                </div>
                <div className='flex gap-3 items-center'>
                    <img src={Share} alt='heart' className='h-5 w-5'/>
                    <span>27</span>
                </div>
                <div className='flex gap-3 items-center'>
                    <img src={Commentaire} alt='heart' className='h-5 w-5'/>
                    <span>27</span>
                </div>
                <div className='flex gap-3 items-center'>
                    <img src={Fanion} alt='heart' className='h-5 w-5'/>
                </div>
            </div>
        </div>
    </section>
  )
}
