import * as React from 'react';
import ProjectImage1 from '../../assets/images/project-img-4.jpeg';
import ProjectImage2 from '../../assets/images/project-img-1.jpeg';
import ProjectImage3 from '../../assets/images/project-img-2.jpeg';
import ProjectImage4 from '../../assets/images/project-img-5.jpeg';
import ProjectImage5 from '../../assets/images/project-img-7.png';
import ProjectImage6 from '../../assets/images/project-img-3.jpeg';
import PageLayout from '../page-layout';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ProjectBlockDetail = ({project}) => {
  return (
    <div className="flex flex-col items-start mt-5 space-y-3 lg:flex-row lg:items-center lg:space-x-7 lg:space-y-0">
      <p className="text-dark_green text-xl leading-none tracking-[0.4px] sm:text-2xl sm:tracking-[0.48px]">
        {project.title}
      </p>
      <a
        className="text-dark_green text-base leading-none tracking-[0.32px] uppercase whitespace-nowrap animate-underline sm:text-[21px] sm:tracking-[0.42px]"
        href={project.link}
      >
        View Project
      </a>
    </div>
  );
};

const WorkPageContent = () => {
  const [isPageEntered, setIsPageEntered] = React.useState(false);
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [allProjects, setAllProjects] = React.useState([]);
  const [workProjectRefs, setWorkProjectRefs] = React.useState([]);

  const { allWpProject } = useStaticQuery(
    graphql`
      {
        allWpProject(sort: {date: ASC}) {
          edges {
            node {
              id
              featuredImage {
                node {
                  altText
                  gatsbyImage(layout: CONSTRAINED, width: 800, placeholder: BLURRED)
                }
              }
              title
              link
            }
          }
        }
      }
    `
  );


  React.useEffect(() => {
    // Concatenate new posts to the existing list
    setAllProjects((prevProjects) => [...prevProjects, ...allWpProject.edges]);
  }, [allWpProject.edges]);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
        if ( entry.target.getAttribute('data-ref-type') === 'project' ) {
          entry.target.classList.add('reveal');
        }
        if ( entry.target.getAttribute('data-ref-type') === 'more-projects' ) {
          // Load more posts when user reaches the bottom
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

  React.useEffect(() => {
    const target = document.querySelector('#infinite-scroll-trigger');
    if (target) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, [observer]);

  const projects = allProjects.slice(0, currentPage * postsPerPage);

  React.useEffect(() => {
    // Create refs based on the length of allProjects
    if ( !allProjects.length ) return
    const newRefs = Array(allProjects.length)
      .fill()
      .map((_) => React.createRef());

    // Set the new refs to workProjectRefs
    setWorkProjectRefs(newRefs);

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.5, // Trigger when 50% of the target is in the viewport
    };

    workProjectRefs.forEach((ref, i) => {
        const observer = new IntersectionObserver(handleIntersection, options);
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.unobserve(ref.current);
        };
    })

  }, [allProjects]);


  return (
    <PageLayout className="work">
      {/* <section
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
      </section> */}

      <section className="flex flex-col w-full max-w-main mx-auto px-5 sm:px-12">
        {projects.map((project, i) => {
          console.log('project index', i)
          return (
            <div
              className={`work-project-block animate-reveal max-w-[80%] h-work_project py-4 mb-40 ${
                i % 2 ? 'ml-auto' : ''
              } sm:mb-32`}
              key={i}
              data-ref-type="project"
              data-title={project.node.title}
              ref={workProjectRefs[i]}
            >
              {
                project.node.featuredImage && (
                  <a className="w-fit h-full" href="/">
                    <GatsbyImage className="w-fit h-full" href="/" image={getImage(project.node.featuredImage.node.gatsbyImage)} alt={project.node.featuredImage.node.altText || project.node.title} />
                  </a>
                )
              }
              <ProjectBlockDetail project={project.node}/>
            </div>
          )
        }
        )}
        <div id="infinite-scroll-trigger" data-ref-type="more-projects" style={{ height: '10px' }} />
      </section>
    </PageLayout>
  );
};

export default WorkPageContent;
