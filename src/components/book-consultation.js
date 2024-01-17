import React from 'react';
import ConsultationImage from '../assets/images/consultation.jpeg';
import Helper from '../helper';

const BookConsultation = () => {
  const [scrollRevealRefs] = React.useState(
    Array(3)
      .fill()
      .map((_) => {
        return React.useRef();
      })
  );

  React.useEffect(() => {
    scrollRevealRefs.forEach((ref) =>
      Helper.setupIntersectionObserver(ref, handleIntersection)
    );
  }, [scrollRevealRefs]);

  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting && !entry.isVisible) return;

    const revealEl = entry.target;
    const orderNumber = revealEl.getAttribute('data-block-order');
    if (orderNumber === 2) {
      setTimeout(() => revealEl.classList.add('reveal'), 250);
    } else {
      revealEl.classList.add('reveal');
    }
  };

  return (
    <section className="relative py-36 bg-dark_red z-10">
      <div className="flex flex-col items-center justify-center max-w-main mx-auto px-5 sm:px-12">
        <p
          className="scroll-reveal max-w-[330px] text-taupe text-base leading-[21px] tracking-[0.48px] text-center sm:max-w-[620px] sm:text-[21px] sm:leading-[24px] sm:tracking-[0.63px]"
          data-block-order="1"
          ref={scrollRevealRefs[0]}
        >
          The considered way our projects wear, age, and patina is a deliberate
          part of the design process intended to create a natural and organic
          architecture.
        </p>
        <div
          className="scroll-reveal max-w-[260px] my-9 sm:max-w-[360px] sm:my-16"
          data-block-order="2"
          ref={scrollRevealRefs[1]}
        >
          <img src={ConsultationImage} alt="consultation" />
        </div>
        <p
          className="scroll-reveal max-w-[300px] text-taupe text-[40px] leading-[38px] tracking-[1.2px] text-center cursor-pointer hover:underline sm:text-5xl sm:leading-[42px] sm:tracking-[1.44px] sm:no-underline"
          data-block-order="3"
          ref={scrollRevealRefs[2]}
        >
          Book a Consultation
        </p>
      </div>
    </section>
  );
};

export default BookConsultation;
