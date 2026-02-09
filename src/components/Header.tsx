import Icon from '../assets/icon.png';
import Search from '../assets/search.png';
import Box from '../assets/box.png';
import Notification from '../assets/notification.png';
import Avatar from './Avatar';
import Marvel from '../assets/marvel-logo.jpg';
import SW from '../assets/Star-wars-logo-new-tall.png';
import HG from '../assets/hunger-games-font.png';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const logout = () => {
    signOut(auth);
    setUser(null);
  };


  return (
    <section className="sticky top-0 z-50 bg-white justify-between items-center flex px-18 py-3 border-b border-gray-200">
        <div className='flex items-center h-9 gap-4'>
            <Link to="/">
              <img src={Icon} alt="React Logo" className="h-6 w-6"/>
            </Link>
            <div className='bg-stone-200 w-50 rounded-sm flex p-1 items-center'>
                <img src={Search} className="h-3.5 w-3.5 m-1.5"/>
                <input placeholder='Search...' className='w-full'></input>
            </div>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-8">
            <li>
              <Link
                to="/marvel"
                className="relative w-30 h-10 block px-4 py-2 text-center text-white font-bold rounded-md transition-all duration-300 hover:scale-115"
                style={{
                  backgroundImage: `url(${Marvel})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
              </Link>
            </li>
            <li>
              <Link
                to="/the-hunger-games"
                className="relative w-30 h-10 block px-4 py-2 text-center text-white font-bold rounded-md transition-all duration-300 hover:scale-115"
                style={{
                  backgroundImage: `url(${HG})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
              </Link>
            </li>
            <li>
              <Link
                to="/star-wars"
                className="relative w-30 h-10 block px-4 py-2 text-center text-white font-bold rounded-md transition-all duration-300 hover:scale-115"
                style={{
                  backgroundImage: `url(${SW})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
              </Link>
            </li>
          </ul>
        </div>
        <div className='flex items-center h-9 gap-4'>
            {user ? (
              <>
              <button
                onClick={() => logout()}
                className="bg-black hover:bg-stone-800 py-2 px-4 h-9 rounded-sm font-medium text-white flex items-center gap-2"
              >
                <p>Logout</p>
              </button>
              <img src={Box} className="h-6 w-6 m-1.5"/>
              <span className='h-6 border border-gray-200'/>
              <img src={Notification} className="h-4 w-4 m-1.5"/>
              <Link to="/profil"><Avatar /></Link>
              </>
            ) : (
              <Link to="/login">
                <button className="bg-black hover:bg-stone-800 py-2 px-4 h-9 rounded-sm font-medium text-white flex items-center gap-2">
                  <p>Login</p>
                </button>
              </Link>
            )}
        </div>
    </section>
  )
}
