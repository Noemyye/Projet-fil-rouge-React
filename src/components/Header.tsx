import Icon from '../assets/icon.png';
import Avatar from './Avatar';
import SearchBar from './SearchBar';
import Marvel from '../assets/marvel-logo.jpg';
import SW from '../assets/Star-wars-logo-new-tall.png';
import HG from '../assets/hunger-games-font.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '../stores/useAuthLogin';

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const logoutStore = useAuthStore((state) => state.logout);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutStore();
    navigate('/login');
  };

  return (
    <section className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 sm:px-8 lg:px-18">
        <div className="flex items-center h-9 gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 px-2 items-center justify-center rounded-sm border border-gray-300 text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className="text-xs font-semibold">Menu</span>
          </button>
          <Link to="/">
            <img src={Icon} alt="React Logo" className="h-6 w-6" />
          </Link>
          <div className="hidden sm:block">
            <SearchBar />
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
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
              ></Link>
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
              ></Link>
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
              ></Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center h-9 gap-4">
          {user ? (
            <>
              <button
                onClick={() => handleLogout()}
                className="bg-black hover:bg-stone-800 py-2 px-4 h-9 rounded-sm font-medium text-white flex items-center gap-2"
              >
                <p>Logout</p>
              </button>
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
      </div>

      {menuOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="px-4 py-3 sm:px-8">
            <div className="sm:hidden">
              <SearchBar />
            </div>
            <ul className="mt-3 flex flex-col gap-3">
              <li>
                <Link
                  to="/marvel"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium"
                >
                  Marvel
                </Link>
              </li>
              <li>
                <Link
                  to="/the-hunger-games"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium"
                >
                  Hunger Games
                </Link>
              </li>
              <li>
                <Link
                  to="/star-wars"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium"
                >
                  Star Wars
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}
