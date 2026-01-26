import Heart from '../assets/heart_b.png';
import Share from '../assets/share.png';
import Fanion from '../assets/fanion.png';
import Commentaire from '../assets/commentaire.png';
import { useState } from 'react';

interface CreateTweetProps {
    onAddTweet: (tweet: string) => void;
  }

export default function CreateTweet({onAddTweet}: CreateTweetProps) {
    const [inputValue, setInputValue] = useState<string>(''); 

    const handleAddTweet = () => {
        if (inputValue.trim() !== '') {
            onAddTweet(inputValue); 
            setInputValue(''); 
        }
    };

  return (
    <section className='w-200 h-40 flex flex-col bg-stone-100 rounded-md p-5'>
        <div className='flex text-base items-start h-full '>
            <input 
                placeholder='Create a post...' 
                className='w-full'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            ></input>
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-5 content-left'>
            <div className='flex gap-3 items-center'>
                <button className=''><img src={Heart} alt='heart' className='h-5 w-5'/></button>
            </div>
            <div className='flex gap-3 items-center'>
                <img src={Share} alt='heart' className='h-5 w-5'/>
            </div>
            <div className='flex gap-3 items-center'>
                <img src={Commentaire} alt='heart' className='h-5 w-5'/>
            </div>
            <div className='flex gap-3 items-center'>
                <img src={Fanion} alt='heart' className='h-5 w-5'/>
            </div>
        </div>
        <button
            onClick={handleAddTweet}
            className='ml-2 bg-blue-500 text-white px-3 py-1 rounded'
        >
            Post
        </button>
        </div>
    </section>
  )
}
