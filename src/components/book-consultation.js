import React from 'react';
import ConsultationImage from '../assets/images/consultation.jpeg';

const BookConsultation = () => {
  return (
    <section className="relative py-36 bg-dark_red">
      <div className="flex flex-col items-center justify-center max-w-main mx-auto px-5 sm:px-12">
        <p className="max-w-[330px] text-taupe text-base leading-[21px] tracking-[0.48px] text-center sm:max-w-[620px] sm:text-[21px] sm:leading-[24px] sm:tracking-[0.63px]">
          The considered way our projects wear, age, and patina is a deliberate
          part of the design process intended to create a natural and organic
          architecture.
        </p>
        <div className="max-w-[260px] my-9 sm:max-w-[360px] sm:my-16">
          <img src={ConsultationImage} alt="consultation" />
        </div>
        <p className="max-w-[300px] text-taupe text-[40px] leading-[38px] tracking-[1.2px] text-center underline hover:underline sm:text-5xl sm:leading-[42px] sm:tracking-[1.44px] sm:no-underline">
          Book a Consultation
        </p>
      </div>
    </section>
  );
};

export default BookConsultation;
