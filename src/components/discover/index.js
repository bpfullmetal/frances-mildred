import * as React from 'react';
import ProjectImage1 from '../../assets/images/consultation.jpeg';
import ProjectImage2 from '../../assets/images/project-img-5.jpeg';
import ProjectImage3 from '../../assets/images/project-img-1.jpeg';
import ProjectImage4 from '../../assets/images/project-img-6.jpeg';
import ProjectImage5 from '../../assets/images/project-img-2.jpeg';
import ProjectImage6 from '../../assets/images/project-img-3.jpeg';
import FooterSection from '../footer-section';
import HeaderMenu from '../header-menu';

const DiscoverPageContent = ({ content, menuItems, title, uri }) => {
  const allProjectsData = [
    {
      name: 'Bond St Townhouse',
      image: ProjectImage1,
    },
    {
      name: 'Bond St Townhouse',
      image: ProjectImage2,
    },
    {
      name: 'Bond St Townhouse',
      image: ProjectImage3,
    },
    {
      name: 'Bond St Townhouse',
      image: ProjectImage4,
    },
    {
      name: 'Bond St Townhouse',
      image: ProjectImage5,
    },
    {
      name: 'Bond St Townhouse',
      image: ProjectImage6,
    },
  ];

  return (
    <main>
      <HeaderMenu menuItems={menuItems} currentURI={uri} />

      <section className="bg-dark_blue py-32 sm:py-48">
        <div className="flex flex-col w-full max-w-main mx-auto px-5 sm:px-12">
          <p className="text-3xl leading-[44px] mb-16 sm:text-4xl sm:mb-52">
            Design for &nbsp;<span className="underline">Life</span> +
          </p>

          <div className="projects-grid">
            {allProjectsData.map((project, i) => (
              <div className="flex flex-col space-y-4" key={i}>
                <div className="">
                  <img src={project.image} alt={project.name} />
                </div>
                <p className="text-xl leading-none tracking-[0.48px] sm:text-2xl">
                  {project.name}
                </p>
                <div className="w-fit text-base leading-none tracking-[0.32px] uppercase animate-underline sm:text-[21px] sm:tracking-[0.42px]">
                  <a href="/">View Project</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSection menuItems={menuItems.filter((item) => item.url !== '/')} />
    </main>
  );
};

export default DiscoverPageContent;
