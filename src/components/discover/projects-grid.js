import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const DesignProjectsGrid = ({ category, projects }) => {
  const projectRefs = Array(projects.length)
    .fill()
    .map((_) => {
      return React.createRef();
    });

  React.useEffect(() => {
    setupIntersectionObservers();
  }, [projects]);

  const setupIntersectionObservers = () => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.3, // Trigger when 50% of the target is in the viewport
    };

    projectRefs.forEach((ref, i) => {
      const observer = new IntersectionObserver(
        (entries) => handleIntersection(entries, i),
        options
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        observer.unobserve(ref.current);
      };
    });
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

  if (projectRefs.length < 1) return <></>;

  return (
    <div className="projects-grid">
      {Array.from(projects).map((project, i) => (
        <div
          className="projects-grid__item flex flex-col"
          key={`${category}-${i}`}
          ref={projectRefs[i]}
        >
          {project.node.featuredImage && (
            <a className="mb-4" href={project.node.link}>
              <GatsbyImage
                image={getImage(project.node.featuredImage.node.gatsbyImage)}
                alt={
                  project.node.featuredImage
                    ? project.node.featuredImage.node.altText
                    : project.node.title
                }
              />
            </a>
          )}
          <p className="text-xl leading-none tracking-[0.48px] mb-3 sm:text-[22px]">
            {project.node.title}
          </p>
          <div className="w-fit text-base !leading-none tracking-[0.32px] uppercase animate-underline sm:text-lg sm:tracking-[0.42px]">
            <a href={project.node.link}>View Project</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesignProjectsGrid;
