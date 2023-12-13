import React from 'react';
import LogoMonogramGif from '../assets/images/logo-monogram.gif';

const HeaderMenu = ({ menuItems }) => {
  if (menuItems.length < 1) {
    return <div>No menus!</div>;
  }

  return (
    <header className="sticky top-0 bg-white px-12 z-10">
      <ul className="flex justify-between">
        {menuItems.map((item, i) => (
          <li key={i} className="text-sm py-3">
            <a href={item.url}>
              <span>{item.label}</span>
              {item.url === '/' && (
                <img src={LogoMonogramGif} alt="logo monogram" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default HeaderMenu;
