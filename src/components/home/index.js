import * as React from 'react';
import Slider from 'react-slick';
import HomeImage1 from '../../assets/images/home-img-1.jpeg';
import HomeImage2 from '../../assets/images/home-img-2.png';
import ProjectImage1 from '../../assets/images/project-img-1.jpeg';
import ProjectImage2 from '../../assets/images/project-img-2.jpeg';
import ProjectImage3 from '../../assets/images/project-img-3.jpeg';
import ProjectImage4 from '../../assets/images/project-img-4.jpeg';
import ProjectImage5 from '../../assets/images/project-img-5.jpeg';
import BookConsultation from '../book-consultation';
import FooterSection from '../footer-section';
import HeaderMenu from '../header-menu';
import HomeBannerSection from './banner';

const HomePageContent = ({ content, menuItems, title, uri }) => {
  const imageRef = React.useRef(null);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    const imageEle = imageRef.current;
    if (imageEle) {
      const scrollOffsetTop = imageEle.getBoundingClientRect().top;
      if (scrollOffsetTop - window.innerHeight * 0.8 < 0) {
        imageEle.classList.add('reveal');
      }
    }
  };

  const sliderSettings = {
    className: 'slider variable-width',
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
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
    <main>
      <HomeBannerSection />
      <HeaderMenu menuItems={menuItems} currentURI={uri} />

      <section className="relative flex items-center">
        <div className="">
          <img
            className="min-h-screen rounded-none object-cover"
            src={HomeImage1}
            alt=""
          />
        </div>
        <div className="absolute w-full h-full">
          <div className="sticky top-[600px] max-w-main mx-auto px-5 pb-40 mt-[600px] sm:px-12">
            <p className="max-w-[630px] text-white text-3xl leading-[37px] mb-4 sm:4xl sm:leading-[44px] lg:pl-8">
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

      <section className="flex flex-col max-w-main mx-auto pt-14 px-5 space-y-32 sm:px-12 lg:flex-row lg:space-y-0">
        <div className="lg:pl-8">
          <p className="text-dark_green text-xl leading-[44px] sm:text-2xl">
            The Studio
          </p>
        </div>
        <div className="lg:max-w-[680px] ml-auto xl:max-w-[900px]">
          <p className="text-dark_green text-3xl leading-[37px] mb-6 sm:text-4xl sm:leading-[44px] sm:mb-8">
            This is an area for a short paragraph about Frances Mildred. This
            will link through to the about us page. This should be between 25-35
            words no longer. It should not exceed four lines of copy.{' '}
          </p>
          <div className="scroll-reveal" ref={imageRef}>
            <img src={HomeImage2} alt="" />
          </div>
        </div>
      </section>

      <section className="flex flex-col mt-36 mb-20 overflow-x-hidden pl-5 sm:mt-44 sm:pl-12 lg:pl-20 xl:ml-our_latest_work">
        <div className="flex justify-between text-dark_green text-xl leading-tight mb-5 sm:justify-start sm:text-2xl">
          <p>Our latest work</p>
          <p className="animate-underline ml-6 mr-5">
            <a href="/">View all work</a>
          </p>
        </div>
        <div className="project-carousel -ml-2.5 sm:ml-0">
          <Slider {...sliderSettings}>
            {latestProjects.map((project) => (
              <div className="flex flex-col px-2.5 sm:px-0.5" key={project.id}>
                <img className="" src={project.image} alt="project 1" />
                <div className="flex flex-col items-start space-y-3 text-dark_green mt-4 sm:flex-row sm:items-center sm:space-x-7 sm:space-y-0">
                  <p className="text-xl tracking-[0.4px] sm:text-2xl sm:tracking-[0.48px]">
                    Bond St Townhouse
                  </p>
                  <p className="text-base tracking-[0.32px] uppercase animate-underline sm:text-[21px] sm:tracking-[0.42px]">
                    <a href="/">View project</a>
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <BookConsultation />
      <FooterSection menuItems={menuItems.filter((item) => item.url !== '/')} />
    </main>
  );
};

export default HomePageContent;
