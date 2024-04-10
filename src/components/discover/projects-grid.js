import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Helper from '../../helper';
import ProjectCarouselModal from '../project/carousel-modal';

const DesignProjectsGrid = ({ category, projects }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [clickedImageOrder, setClickedImageOrder] = React.useState(-1);

  const projectRefs = Array(projects.length)
    .fill()
    .map((_) => {
      return React.createRef();
    });

  React.useEffect(() => {
    setupIntersectionObservers();
  }, [projects]);

  React.useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 600);
    };

    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, [])

  const setupIntersectionObservers = () => {
    projectRefs.forEach((ref, i) =>
      Helper.setupIntersectionObserver(ref, (entries) =>
        handleIntersection(entries, i)
      )
    );
  };

  const handleIntersection = (entries, i) => {
    const [entry] = entries;
    if (!entry.isIntersecting && !entry.isVisible) return;

    let gridColumns = 1;
    if (window.innerWidth > 1023) {
      gridColumns = 3;
    } else if (window.innerWidth > 639) {
      gridColumns = 2;
    }
    const revealEl = entry.target;
    revealEl.classList.add('animate');
    setTimeout(
      () => revealEl.classList.add('fade-in'),
      (i % gridColumns) * 500
    );
  };

  const handleClickImage = (index, url) => {
    if ( isMobile ) {
      window.location.href = url;
      return
    }
    setClickedImageOrder(index) 
  }

  if (projectRefs.length < 1) return <></>;

  return (
    <div className="projects-grid">
      {Array.from(projects).map((project, i) => (
        <div
          className="projects-grid__item flex flex-col"
          key={`${category}-${i}`}
          ref={projectRefs[i]}
        >
          {project.image && (
            <div className="image-to-lightbox" onClick={() => handleClickImage(i, project.link)}>
              <GatsbyImage
                className="rounded"
                image={getImage(project.image.node.gatsbyImage)}
                
                alt={
                  project.image
                    ? project.image.node.altText
                    : project.title
                }
              />
            </div>
          )}
          <p className="text-xl leading-none tracking-[0.48px] mb-1 sm:text-lg">
            <a href={project.link}>{project.title}</a>
          </p>
        </div>
      ))}
      {
          clickedImageOrder > -1 && (
              <ProjectCarouselModal
                  imageBlocks={projects}
                  initialSlide={clickedImageOrder}
                  onClose={() => setClickedImageOrder(-1)}
              />
          )
      }
    </div>
  );
};

export default DesignProjectsGrid;
