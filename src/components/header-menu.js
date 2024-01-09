import * as React from 'react';
import { graphql, StaticQuery } from 'gatsby';
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

const HeaderMenu = ({ currentURI }) => {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <StaticQuery
      query={graphql`
        query {
          wpMenu(locations: { eq: GATSBY_HEADER_MENU }) {
            menuItems {
              nodes {
                label
                url
              }
            }
          }
        }
      `}
      render={(data) => {
        
        const menuItems = data?.wpMenu?.menuItems?.nodes || [];
        // console.log('menuItems: ', menuItems);

        if (menuItems.length < 1) {
          return <></>;
        }

        // Rest of your component logic...

        return (
          <header className="sticky top-0 bg-white px-12 z-10">
            <ul className="hidden justify-between sm:flex">
              {menuItems.map((item, i) => (
                <li key={i} className="text-black text-sm py-3">
                  <a href={item.label === 'Home' ? '/' : item.url}>
                    {item.label === 'Home' ? (
                      <div className="home-logo"></div>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex justify-center sm:hidden py-1">
              <div
                className="text-black text-sm text-center leading-[40px] tracking-[0.42px]"
                onClick={() => setIsOpened(true)}
              >
                Menu
              </div>
              <div
                className={`${
                  isOpened ? 'translate-0' : '-translate-x-full'
                } fixed top-0 w-screen h-screen `}
              >
                <div className="h-full flex flex-col items-center bg-white">
                  <div
                    className="w-full flex justify-center py-5"
                    onClick={() => setIsOpened(false)}
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M1 1L12 12" stroke="black" />
                      <path d="M12 1L1 12" stroke="black" />
                    </svg>
                  </div>
                  <div className="flex flex-col mt-10">
                    {menuItems.map((item, i) => (
                      <div
                        key={i}
                        className="text-black leading-[40px] tracking-[0.48px] text-center"
                      >
                        <a href={item.url}>{item.label}</a>
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex flex-col logo px-5 py-8 mt-auto space-y-6">
                    <div className="flex justify-between">
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterF fill="black" />
                      </div>
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterR fill="black" />
                      </div>
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterA fill="black" />
                      </div>
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterN fill="black" />
                      </div>
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterC fill="black" />
                      </div>
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterE fill="black" />
                      </div>
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterS fill="black" />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterM fill="black" />
                      </div>
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterI fill="black" />
                      </div>
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterL fill="black" />
                      </div>
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterD fill="black" />
                      </div>
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterR fill="black" />
                      </div>
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterE fill="black" />
                      </div>
                      <div className="flex justify-center w-8 h-[30px]">
                        <LetterD fill="black" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        );
      }}
    />
  );
};

export default HeaderMenu;
