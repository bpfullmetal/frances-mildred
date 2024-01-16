import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import HomeImage1 from '../../assets/images/home-img-1.jpeg';
import HomeImage2 from '../../assets/images/home-img-2.png';
import ProjectImage1 from '../../assets/images/project-img-1.jpeg';
import ProjectImage2 from '../../assets/images/project-img-2.jpeg';
import ProjectImage3 from '../../assets/images/project-img-3.jpeg';
import ProjectImage4 from '../../assets/images/project-img-4.jpeg';
import ProjectImage5 from '../../assets/images/project-img-5.jpeg';
import PageLayout from '../page-layout';
import HomeBannerSection from '../blocks/banner';

import 'swiper/css';
import 'swiper/css/pagination';

const HomePageContent = () => {
  const [scrollRevealRefs] = React.useState(
    Array(3)
      .fill()
      .map((_) => {
        return React.useRef();
      })
  );
  const [latestWorkRefs] = React.useState(
    Array(5)
      .fill()
      .map((_) => {
        return React.useRef();
      })
  );
  const latestWorkCarouselRef = React.useRef();

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
          if (i === 1) {
            setTimeout(() => scrollRevealEle.classList.add('reveal'), 500);
          } else if (i === 2) {
            setTimeout(() => scrollRevealEle.classList.add('reveal'), 250);
          } else {
            scrollRevealEle.classList.add('reveal');
          }
        }
      }
    });

    const latestWorkCarousel = latestWorkCarouselRef.current;
    if (latestWorkCarousel) {
      const scrollOffsetTop = latestWorkCarousel.getBoundingClientRect().top;
      if (scrollOffsetTop - window.innerHeight * 0.6 < 0) {
        latestWorkRefs.forEach((ref, i) => {
          const slideItemRef = ref.current;
          if (slideItemRef) {
            setTimeout(() => slideItemRef.classList.add('fade-in'), 500 * i);
          }
        });
      }
    }
  };

  const latestProjects = [
    {
      id: 1,
      image: ProjectImage1,
    },
    {
      id: 2,
      image: ProjectImage2,
    },
    {
      id: 3,
      image: ProjectImage3,
    },
    {
      id: 4,
      image: ProjectImage4,
    },
    {
      id: 5,
      image: ProjectImage5,
    },
  ];

  return (
    <div>
      <HomeBannerSection />

      <PageLayout>
        <section className="relative flex items-center">
          <div>
            <img
              className="min-h-screen rounded-none object-cover"
              src={HomeImage1}
              alt=""
            />
          </div>
          <div className="absolute w-full h-full">
            <div className="sticky top-[600px] max-w-main mx-auto px-5 pb-40 mt-[600px] sm:px-12">
              <p className="max-w-[630px] text-white text-3xl leading-[37px] mb-4 sm:text-4xl sm:leading-[44px] lg:pl-8">
                This is an area for a short paragraph about the latest project.
              </p>
              <a
                className="text-base text-white leading-tight tracking-[0.48px] underline sm:text-2xl lg:pl-8"
                href="/"
              >
                View Project
              </a>
            </div>
          </div>
        </section>

        <section className="flex flex-col max-w-main mx-auto pt-14 px-5 space-y-32 sm:px-12 md:flex-row md:space-y-0">
          <div className="lg:pl-8">
            <p
              className="scroll-reveal text-dark_green text-xl leading-[44px] whitespace-nowrap sm:text-[22px] sm:mr-16"
              ref={scrollRevealRefs[0]}
            >
              The Studio
            </p>
          </div>
          <div className="max-w-[680px] ml-auto lg:max-w-[900px]">
            <p
              className="scroll-reveal text-dark_green text-xl mb-6 sm:text-2xl sm:mb-8"
              ref={scrollRevealRefs[1]}
            >
              This is an area for a short paragraph about Frances Mildred. This
              will link through to the about us page. This should be between
              25-35 words no longer. It should not exceed four lines of copy.{' '}
            </p>
            <div className="scroll-reveal" ref={scrollRevealRefs[2]}>
              <img src={HomeImage2} alt="" />
            </div>
          </div>
        </section>

        <section
          className={`flex flex-col mt-36 mb-20 overflow-x-hidden pl-5 sm:mt-44 sm:pl-12 lg:pl-20 ${
            latestProjects.length < 4 ? 'xl:ml-our_latest_work' : ''
          }`}
        >
          <div className="flex justify-between text-dark_green text-xl leading-tight mb-5 sm:justify-start sm:text-[22px]">
            <p>Our latest work</p>
            <p className="animate-underline ml-6 mr-5">
              <a href="/">View all work</a>
            </p>
          </div>
          <div
            className="project-carousel -ml-2.5 sm:ml-0"
            ref={latestWorkCarouselRef}
          >
            <Swiper slidesPerView={'auto'} spaceBetween={4}>
              {latestProjects.map((project, i) => (
                <SwiperSlide key={`project-slide-${project.id}`}>
                  <div className="flex flex-col px-2 sm:px-0.5">
                    <div className="swiper-slide-image bg-[#f8f8f8] rounded">
                      <a href="/">
                        <img
                          src={project.image}
                          alt="project 1"
                          ref={latestWorkRefs[i]}
                        />
                      </a>
                    </div>
                    <div className="flex flex-col flex-wrap items-start text-dark_green sm:flex-row sm:items-center">
                      <p className="text-xl leading-[20px] tracking-[0.4px] mt-4 mr-3 sm:text-2xl sm:tracking-[0.48px] sm:mr-7">
                        Bond St Townhouse
                      </p>
                      <p className="text-base leading-[16px] tracking-[0.32px] uppercase animate-underline mt-4 sm:text-[21px] sm:leading-[20px] sm:tracking-[0.42px]">
                        <a className="whitespace-nowrap" href="/">
                          View project
                        </a>
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </PageLayout>
    </div>
  );
};

export default HomePageContent;
