import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Helper from '../../helper';


const DesignProjectsGrid = ({ category, projects, handleOnClickImage }) => {

  const projectRefs = Array(projects.length)
    .fill()
    .map((_) => {
      return React.createRef();
    });

  React.useEffect(() => {
    setupIntersectionObservers();
  }, [projects]);

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

  

  if (projectRefs.length < 1) return <></>;

  return (
    <div className="projects-grid">
      {Array.from(projects).map((project, i) => (
        <div
          className="projects-grid__item flex flex-col"
          key={`${category}-${i}`}
          ref={projectRefs[i]}
        >
          {project?.image?.node?.localFile?.childImageSharp?.gatsbyImageData && (
            <div className="image-to-lightbox" onClick={() => handleOnClickImage(i, project.link)}>
              <GatsbyImage
                className="rounded"
                image={getImage(project.image.node.localFile.childImageSharp.gatsbyImageData)}
                
                alt={
                  project.image
                    ? project.image.node.altText
                    : project.title
                }
              />
            </div>
          )}
          <p className="text-xl leading-none tracking-[0.48px] mb-1 sm:text-lg mt-2">
            <a href={project.link}>{project.title}</a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default DesignProjectsGrid;
