import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Login', path: '/login' },
  { name: 'SignUp', path: '/signup' },

];

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="z-[999] relative bg-#f8f9fa">
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full rounded-none border border-#f8f9fa border-opacity-40 bg-#f8f9fa bg-opacity-80 shadow-lg shadow-white/[0.03] backdrop-blur-[0.9rem] sm:top-6 sm:h-[3.25rem] sm:w-[36rem] sm:rounded-full dark:bg-gray-50  dark:bg-opacity-65"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      ></motion.div>

      <nav className="flex fixed top-[0.15rem] left-1/2 h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0 dark:bg-opacity-65">
        <ul className="flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-grey-900 sm:w-[initial] sm:flex-nowrap sm:gap-5">
          {links.map((link) => (
            <motion.li
              className="h-3/4 flex items-center justify-center relative"
              key={link.path}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <button
                className={clsx(
                  "flex w-full items-center justify-center px-3 py-3 transition hover:text-grey-900 dark:text-gray-500 dark:hover:text-gray-800",
                  {
                    "text-slate-950 dark:text-gray-900": location.pathname === link.path,
                  }
                )}
                onClick={() => navigate(link.path)}
              >
                {link.name}

                {location.pathname === link.path && (
                  <motion.span
                    className="bg-slate-300 rounded-full absolute inset-0 -z-10 dark:bg-gray-300"
                    layoutId="activeSection"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;