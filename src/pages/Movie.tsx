import ListTweets from '../components/ListTweets'
import CreateTweet from '../components/CreateTweet'
import { useState } from 'react';

export default function Movie() {
  const [tweets, setTweets] = useState<string[]>([]);

  const addTweet = (newTweet: string) => {
    setTweets([newTweet, ...tweets]);
  };

  return (
    <div className='flex flex-col gap-2'>
      <CreateTweet onAddTweet={addTweet} />
      <ListTweets tweets={tweets} />
    </div>
  );
}