import * as React from 'react';

const CategoryModal = ({ onClose }) => {
  return (
    <div className="fixed w-screen h-screen top-0 flex items-center justify-center bg-[#00000088]" onClick={() => onClose()}>
      <div className="w-full h-[400px] max-w-[600px] bg-white"></div>
    </div>
  );
};

export default CategoryModal;
