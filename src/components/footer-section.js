import React from 'react';
import LetterA from '../assets/js/icons/letter-a';
import LetterC from '../assets/js/icons/letter-c';
import LetterD from '../assets/js/icons/letter-d';
import LetterE from '../assets/js/icons/letter-e';
import LetterF from '../assets/js/icons/letter-f';
import LetterI from '../assets/js/icons/letter-i';
import LetterL from '../assets/js/icons/letter-l';
import LetterM from '../assets/js/icons/letter-m';
import LetterN from '../assets/js/icons/letter-n';
import LetterR from '../assets/js/icons/letter-r';
import LetterS from '../assets/js/icons/letter-s';

const FooterSection = ({ menuItems }) => {
  return (
    <footer className="bg-dark_green pt-12 pb-8 sm:pt-7 sm:pb-14">
      <div className="flex flex-col max-w-main mx-auto px-5 sm:px-12">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex flex-col mr-0 mb-40 md:mr-10 md:mb-0">
            <ul className="flex flex-col mb-12 sm:flex-row sm:mb-24 sm:space-x-6">
              {menuItems.map((item, i) => (
                <li key={i} className="py-2">
                  <a href={item.url}>{item.label}</a>
                </li>
              ))}
              <li className="py-2">
                <a href="/">Instagram</a>
              </li>
            </ul>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-14 sm:space-y-0">
              <div className="flex flex-col">
                <p>94 Prince St.3rd Floor</p>
                <p>New York, NY, 10012</p>
              </div>
              <div className="flex flex-col">
                <a href="tel:+1 212 981 4599">+1 212 981 4599</a>
                <a href="mailto:info@francesmildred.com">
                  info@francesmildred.com
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-start md:items-end">
            <div className="flex flex-col w-full max-w-[480px]">
              <div className="tracking-[0.48px] py-2 mb-3 sm:mb-24">
                Stay Updated
              </div>
              <div className="signup-email">
                <input className="" placeholder="Email Address" />
                <div className="sign-up-btn">Sign up</div>
              </div>
            </div>
          </div>
        </div>

        <div className="logo flex flex-col mt-24 space-y-6 sm:space-y-24 sm:mt-64">
          <div className="flex justify-between">
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterF />
            </div>
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterR />
            </div>
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterA />
            </div>
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterN />
            </div>
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterC />
            </div>
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterE />
            </div>
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterS />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterM />
            </div>
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterI />
            </div>
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterL />
            </div>
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterD />
            </div>
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterR />
            </div>
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterE />
            </div>
            <div className="h-8 sm:h-16 md:h-24 lg:h-28">
              <LetterD />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
