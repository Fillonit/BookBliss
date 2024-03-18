import React, { useState, useEffect } from 'react';
import logo from '../../assets/logoo.png'; // Import the logo image

const Header: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setIsHeaderVisible(!isScrollingDown);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <div className={`fixed top-0 left-0 w-full h-70px  bg-opacity-20 pt-2 pb-2 flex items-center justify-between px-10 z-50 transition-opacity ${isHeaderVisible ? 'opacity-100' : 'opacity-0'}`} style={{ fontFamily: 'Montserrat' }}>
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto mr-4" style={{ filter: 'invert(100%)' }} />
        <h1 className="text-white font-semi-bold text-xl">Bookbliss</h1>
      </div>
      
      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <a href="#" className="text-white hover:text-gray-300">Home</a>
        <a href="#" className="text-white hover:text-gray-300">Products</a>
        <a href="#" className="text-white hover:text-gray-300">Contact</a>
      </div>
    </div>
  );
};

export default Header;
