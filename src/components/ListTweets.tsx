import Avatar from './Avatar';
import Heart from '../assets/heart_b.png';
import Share from '../assets/share.png';
import Fanion from '../assets/fanion.png';
import Commentaire from '../assets/commentaire.png';
import { useState } from 'react';

interface ListTweetsProps {
    tweets: string[];
  }

export default function ListTweets({tweets}: ListTweetsProps) {
    const [count, setCount] = useState(0);
    
    const handleLike = () => {
        setCount(count + 1);
    };
    
  return (
    <>
    {tweets.map((tweet, index) => (
    <section key={index} className='bg-white w-200 flex p-2'>
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
            <div className='py-1.5 flex flex-col gap-3 text-left break-words w-180'>
                {tweet}
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
    ))}
    </>
  )
}
