import * as React from 'react';

const CategoryModal = ({ onClose }) => {
  const [isEntered, setIsEntered] = React.useState(false);

  React.useEffect(() => {
    setIsEntered(true);
  }, []);

  const categoryData = ['work', 'play', 'entertainment', 'cooking', 'relaxing'];

  return (
    <div
      className={`fixed w-screen h-screen top-0 flex ${
        isEntered ? 'bg-[#1a4b7cc0]' : ''
      } transition duration-300 z-20`}
      onClick={() => onClose()}
    >
      <div className="flex flex-col w-full max-w-main mx-auto px-5 sm:px-12">
        <div
          className={`ml-40 mt-12 pl-8 pt-40 transition delay-100 ${
            isEntered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {categoryData.map((category) => (
            <a
              className="title flex items-center w-fit text-3xl leading-[44px] capitalize my-2 sm:text-4xl"
              href="/"
              key={category}
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
