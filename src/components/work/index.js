import * as React from 'react';
import ProjectImage1 from '../../assets/images/project-img-4.jpeg';
import ProjectImage2 from '../../assets/images/project-img-1.jpeg';
import ProjectImage3 from '../../assets/images/project-img-2.jpeg';
import ProjectImage4 from '../../assets/images/project-img-5.jpeg';
import ProjectImage5 from '../../assets/images/project-img-7.png';
import ProjectImage6 from '../../assets/images/project-img-3.jpeg';
import BookConsultation from '../book-consultation';
import FooterSection from '../footer-section';
import HeaderMenu from '../header-menu';

const ProjectBlockDetail = () => {
  return (
    <div className="flex flex-col items-start mt-5 space-y-3 lg:flex-row lg:items-center lg:space-x-7 lg:space-y-0">
      <p className="text-dark_green text-xl leading-none tracking-[0.4px] sm:text-2xl sm:tracking-[0.48px]">
        Bond St Townhouse
      </p>
      <a
        className="text-dark_green text-base leading-none tracking-[0.32px] uppercase animate-underline sm:text-[21px] sm:tracking-[0.42px]"
        href="/"
      >
        View Project
      </a>
    </div>
  );
};

const WorkPageContent = ({ content, menuItems, title, uri }) => {
  return (
    <main>
      <HeaderMenu menuItems={menuItems} currentURI={uri} />

      <section className="work flex flex-col w-full max-w-main mx-auto px-5 sm:px-12">
        <div className="work-project-block mb-40 sm:mb-16">
          <div className="w-full">
            <img src={ProjectImage1} alt="work project 1" />
          </div>
          <ProjectBlockDetail />
        </div>

        <div className="flex flex-col mb-40 space-y-40 md:flex-row md:space-x-20 md:space-y-0 lg:space-x-32">
          <div className="work-project-block">
            <div className="w-full">
              <img src={ProjectImage2} alt="work project 2" />
            </div>
            <ProjectBlockDetail />
          </div>
          <div className="work-project-block md:pt-52">
            <div className="w-full">
              <img src={ProjectImage3} alt="work project 3" />
            </div>
            <ProjectBlockDetail />
          </div>
        </div>

        <div className="work-project-block mb-40 sm:mb-32">
          <div className="w-full">
            <img
              className="w-full max-h-[760px] object-cover"
              src={ProjectImage4}
              alt="work project 4"
            />
          </div>
          <ProjectBlockDetail />
        </div>

        <div className="w-full ml-auto mb-40 pl-0 md:w-1/2 md:mb-20 md:pl-10">
          <div className="work-project-block">
            <div className="w-full">
              <img src={ProjectImage5} alt="work project 5" />
            </div>
            <ProjectBlockDetail />
          </div>
        </div>

        <div className="w-full mb-40 pr-0 md:w-1/2 md:mb-48 md:pr-10">
          <div className="work-project-block">
            <div className="w-full">
              <img src={ProjectImage6} alt="work project 6" />
            </div>
            <ProjectBlockDetail />
          </div>
        </div>
      </section>

      <BookConsultation />
      <FooterSection menuItems={menuItems.filter((item) => item.url !== '/')} />
    </main>
  );
};

export default WorkPageContent;
