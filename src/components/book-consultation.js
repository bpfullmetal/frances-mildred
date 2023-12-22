import React from 'react';
import ConsultationImage from '../assets/images/consultation.jpeg';

const BookConsultation = () => {
  const [scrollRevealRefs] = React.useState(
    Array(3)
      .fill()
      .map((_) => {
        return React.useRef();
      })
  );

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    scrollRevealRefs.forEach((ref, i) => {
      const scrollRevealEle = ref.current;
      if (scrollRevealEle) {
        const scrollOffsetTop = scrollRevealEle.getBoundingClientRect().top;
        if (scrollOffsetTop - window.innerHeight * 0.8 < 0) {
          if (i == 1) {
            setTimeout(() => scrollRevealEle.classList.add('reveal'), 250);
          } else {
            scrollRevealEle.classList.add('reveal');
          }
        }
      }
    });
  };

  return (
    <section className="relative py-36 bg-dark_red">
      <div className="flex flex-col items-center justify-center max-w-main mx-auto px-5 sm:px-12">
        <p
          className="scroll-reveal max-w-[330px] text-taupe text-base leading-[21px] tracking-[0.48px] text-center sm:max-w-[620px] sm:text-[21px] sm:leading-[24px] sm:tracking-[0.63px]"
          ref={scrollRevealRefs[0]}
        >
          The considered way our projects wear, age, and patina is a deliberate
          part of the design process intended to create a natural and organic
          architecture.
        </p>
        <div
          className="scroll-reveal max-w-[260px] my-9 sm:max-w-[360px] sm:my-16"
          ref={scrollRevealRefs[1]}
        >
          <img src={ConsultationImage} alt="consultation" />
        </div>
        <p
          className="scroll-reveal max-w-[300px] text-taupe text-[40px] leading-[38px] tracking-[1.2px] text-center cursor-pointer hover:underline sm:text-5xl sm:leading-[42px] sm:tracking-[1.44px] sm:no-underline"
          ref={scrollRevealRefs[2]}
        >
          Book a Consultation
        </p>
      </div>
    </section>
  );
};

export default BookConsultation;
