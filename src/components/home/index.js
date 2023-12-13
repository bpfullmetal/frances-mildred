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
          <img className="" src={HomeImage1} alt="" />
        </div>
        <div className="absolute flex flex-col justify-center max-w-main m-auto">
          <p className="max-w-[630px] text-white text-4xl leading-[44px] pl-8 mb-4">
            This is an area for a short paragraph about the latest project.
          </p>
          <a className="text-2xl text-white pl-8 underline" href="/">
            View Project
          </a>
        </div>
      </section>

      <section className="flex max-w-main mx-auto pt-4 px-12">
        <div className="">
          <p className="text-dark_green text-2xl leading-[44px]">The Studio</p>
        </div>
        <div className="max-w-[850px] ml-auto">
          <p className="text-dark_green text-[36px] leading-[44px] mb-8">
            This is an area for a short paragraph about Frances Mildred. This
            will link through to the about us page. This should be between 25-35
            words no longer. It should not exceed four lines of copy.{' '}
          </p>
          <img src={HomeImage2} alt="" />
        </div>
      </section>

      <section className="flex flex-col mt-[172px] pl-[100px] xl:ml-our_latest_work overflow-x-hidden">
        <div className="flex mb-5 text-dark_green text-2xl space-x-6">
          <p>Our latest work</p>
          <p className="animate-underline">
            <a href="/">View all work</a>
          </p>
        </div>
        <div>
          <Slider {...sliderSettings}>
            {latestProjects.map((project) => (
              <div
                className="flex flex-col px-0.5"
                key={project.id}
                style={{ width: 490 }}
              >
                <img className="" src={project.image} alt="project 1" />
                <div className="flex items-center space-x-7 text-dark_green mt-4">
                  <p className="text-2xl tracking-[0.48px]">
                    Bond St Townhouse
                  </p>
                  <p className="text-[21px] tracking-[0.42px] uppercase">
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
