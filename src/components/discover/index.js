import * as React from 'react';
import ProjectImage1 from '../../assets/images/consultation.jpeg';
import ProjectImage2 from '../../assets/images/project-img-5.jpeg';
import ProjectImage3 from '../../assets/images/project-img-1.jpeg';
import ProjectImage4 from '../../assets/images/project-img-6.jpeg';
import ProjectImage5 from '../../assets/images/project-img-2.jpeg';
import ProjectImage6 from '../../assets/images/project-img-3.jpeg';
import PageLayout from '../page-layout';
import CategoryModal from './category-modal';

const DiscoverPageContent = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [animationEntrances, setAnimationEntrances] = React.useState({
    background: false,
    title1: false,
    title2: false,
  });
  const [projectRefs] = React.useState(
    Array(6)
      .fill()
      .map((_) => {
        return React.useRef();
      })
  );

  React.useEffect(() => {
    setTimeout(
      () =>
        setAnimationEntrances({
          background: true,
          title1: false,
          title2: false,
        }),
      500
    );
    setTimeout(
      () =>
        setAnimationEntrances({
          background: true,
          title1: true,
          title2: false,
        }),
      1500
    );
    setTimeout(
      () =>
        setAnimationEntrances({
          background: true,
          title1: true,
          title2: true,
        }),
      2000
    );

    setTimeout(() => handleScroll(), 2500);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    let projectOrder = 0;

    projectRefs.forEach((ref) => {
      const projectEle = ref.current;
      if (projectEle) {
        if (!projectEle.classList.value.includes('animate')) {
          const scrollOffsetTop = projectEle.getBoundingClientRect().top;
          if (scrollOffsetTop - window.innerHeight * 0.8 < 0) {
            projectEle.classList.add('animate');
            setTimeout(
              () => projectEle.classList.add('fade-in'),
              projectOrder * 500
            );
            projectOrder++;
          }
        }
      }
    });
  };

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
    <PageLayout className="discover" hiddenBookSection>
      <section
        className={`bg-dark_blue py-32 sm:py-32 ${
          animationEntrances.background ? 'fade-in' : ''
        }`}
      >
        <div className="flex flex-col w-full max-w-main mx-auto px-5 sm:px-12">
          <div className="title flex items-center text-3xl leading-[44px] mb-16 sm:text-4xl sm:mb-32">
            <p className={animationEntrances.title1 ? 'fade-in-top' : ''}>
              Design for &nbsp;
            </p>
            <p className={animationEntrances.title2 ? 'fade-in-top' : ''}>
              <span
                className="underline cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                Life
              </span>{' '}
              +
            </p>
          </div>

          <div className="projects-grid">
            {allProjectsData.map((project, i) => (
              <div
                className="projects-grid__item flex flex-col hover-animate"
                key={`grid-project-${i}`}
                ref={projectRefs[i]}
              >
                <a className="mb-4" href="/">
                  <img src={project.image} alt={project.name} />
                </a>
                <p className="text-xl leading-none tracking-[0.48px] mb-3 sm:text-[22px]">
                  {project.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {openModal && <CategoryModal onClose={() => setOpenModal(false)} />}
    </PageLayout>
  );
};

export default DiscoverPageContent;
