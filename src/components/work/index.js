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
        className="text-dark_green text-base leading-none tracking-[0.32px] uppercase whitespace-nowrap animate-underline sm:text-[21px] sm:tracking-[0.42px]"
        href="/"
      >
        View Project
      </a>
    </div>
  );
};

const WorkPageContent = ({ content, menuItems, title, uri }) => {
  const [isPageEntered, setIsPageEntered] = React.useState(false);

  const workProjectRefs = Array(5)
    .fill()
    .map((_) => {
      return React.useRef();
    });

  React.useEffect(() => {
    setTimeout(() => setIsPageEntered(true), 500);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    workProjectRefs.forEach((ref, i) => {
      const scrollRevealEle = ref.current;
      if (scrollRevealEle) {
        if (!scrollRevealEle.classList.value.includes(' reveal')) {
          const scrollOffsetTop = scrollRevealEle.getBoundingClientRect().top;
          if (scrollOffsetTop - window.innerHeight * 0.8 < 0) {
            scrollRevealEle.classList.add('reveal');
          }
        }
      }
    });
  };

  const workProjectsData = [
    {
      image: ProjectImage2,
      name: 'project 2',
    },
    {
      image: ProjectImage3,
      name: 'project 3',
    },
    {
      image: ProjectImage4,
      name: 'project 4',
    },
    {
      image: ProjectImage5,
      name: 'project 5',
    },
    {
      image: ProjectImage6,
      name: 'project 6',
    },
  ];

  return (
    <main className="work">
      <HeaderMenu menuItems={menuItems} currentURI={uri} />

      <section
        className={`w-full h-screen mb-40 sm:mb-16 opacity-0 ${
          isPageEntered ? 'fade-in' : ''
        }`}
      >
        <a
          className="flex w-full h-work_project"
          href="/work/park-slope-townhouse"
        >
          <img
            className="w-full h-full object-cover rounded-none"
            src={ProjectImage1}
            alt="work project 1"
          />
        </a>
        <ProjectBlockDetail />
      </section>

      <section className="flex flex-col w-full max-w-main mx-auto px-5 sm:px-12">
        {workProjectsData.map((project, i) => (
          <div
            className={`work-project-block animate-reveal max-w-[80%] h-work_project py-4 mb-40 ${
              i % 2 ? 'ml-auto' : ''
            } sm:mb-32`}
            key={i}
            ref={workProjectRefs[i]}
          >
            <a className="w-fit h-full" href="/">
              <img
                className="h-full object-cover"
                src={project.image}
                alt={project.name}
              />
            </a>
            <ProjectBlockDetail />
          </div>
        ))}
      </section>

      <BookConsultation />
      <FooterSection menuItems={menuItems.filter((item) => item.url !== '/')} />
    </main>
  );
};

export default WorkPageContent;
