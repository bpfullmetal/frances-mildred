import React from 'react';
import LetterAImage from '../assets/images/letter-A.svg';
import LetterCImage from '../assets/images/letter-C.svg';
import LetterDImage from '../assets/images/letter-D.svg';
import LetterEImage from '../assets/images/letter-E.svg';
import LetterFImage from '../assets/images/letter-F.svg';
import LetterIImage from '../assets/images/letter-I.svg';
import LetterLImage from '../assets/images/letter-L.svg';
import LetterMImage from '../assets/images/letter-M.svg';
import LetterNImage from '../assets/images/letter-N.svg';
import LetterRImage from '../assets/images/letter-R.svg';
import LetterSImage from '../assets/images/letter-S.svg';

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

        <div className="flex flex-col mt-24 space-y-6 sm:space-y-24 sm:mt-64">
          <div className="flex justify-between">
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterFImage}
                alt="letter F"
              />
            </div>
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterRImage}
                alt="letter R"
              />
            </div>
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterAImage}
                alt="letter A"
              />
            </div>
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterNImage}
                alt="letter N"
              />
            </div>
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterCImage}
                alt="letter C"
              />
            </div>
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterEImage}
                alt="letter E"
              />
            </div>
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterSImage}
                alt="letter S"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterMImage}
                alt="letter M"
              />
            </div>
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterIImage}
                alt="letter I"
              />
            </div>
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterLImage}
                alt="letter L"
              />
            </div>
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterDImage}
                alt="letter D"
              />
            </div>
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterRImage}
                alt="letter R"
              />
            </div>
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterEImage}
                alt="letter E"
              />
            </div>
            <div className="h-[30px] sm:h-[60px] md:h-[90px] lg:h-[113px]">
              <img
                className="w-auto h-full"
                src={LetterDImage}
                alt="letter D"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
