import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PageLayout from '../page-layout';
import Helper from '../../helper';

const ProjectBlockDetail = ({ project }) => {
  return (
    <div className="flex flex-col items-start mt-5 space-y-3 lg:flex-row lg:items-center lg:space-x-7 lg:space-y-0">
      <a
        className="text-dark_green text-xl leading-none tracking-[0.4px] sm:text-2xl sm:tracking-[0.48px]"
        href={project.link}
      >
        {project.title}
      </a>
    </div>
  );
};

const WorkPageContent = (pageData) => {
  const [isPageEntered, setIsPageEntered] = React.useState(false);
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(2);
  const [allProjects, setAllProjects] = React.useState([]);
  const [workProjectRefs, setWorkProjectRefs] = React.useState([]);
  const moreProjectsRef = React.useRef();

  const { allWpProject } = useStaticQuery(
    graphql`
      {
        allWpProject(sort: { date: DESC }) {
          edges {
            node {
              id
              featuredImage {
                node {
                  altText
                  gatsbyImage(
                    layout: FULL_WIDTH
                    width: 800
                    placeholder: BLURRED
                  )
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

  React.useEffect(() => setIsPageEntered(true), []);

  React.useEffect(() => {
    // Concatenate new posts to the existing list
    setAllProjects((prevProjects) => [...prevProjects, ...allWpProject.edges]);
  }, [allWpProject.edges]);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.getAttribute('data-ref-type') === 'project') {
          entry.target.classList.add('reveal');
        }
        if (entry.target.getAttribute('data-ref-type') === 'more-projects') {
          // Load more posts when user reaches the bottom
          if (postsPerPage * currentPage > allProjects.length) return;
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    });
  };

  const projects = allProjects.slice(0, currentPage * postsPerPage);

  React.useEffect(() => {
    // Create refs based on the length of allProjects
    if (!allProjects.length) return;
    const newRefs = Array(allProjects.length)
      .fill()
      .map((_) => React.createRef());

    // Set the new refs to workProjectRefs
    setWorkProjectRefs(newRefs);

    Helper.setupIntersectionObserver(moreProjectsRef, handleIntersection, {
      threshold: 0.5,
    });
  }, [allProjects]);

  React.useEffect(() => {
    workProjectRefs.forEach((ref) =>
      Helper.setupIntersectionObserver(ref, handleIntersection, {
        threshold: 0.2,
      })
    );
  }, [projects]);

  return (
    // opacity-0 ${isPageEntered ? 'fade-in' : ''}
    <PageLayout className={`work`} pageData={pageData}>
      <div className="min-h-screen">
        <section className="grid grid-cols-1 md:grid-cols-2 w-full max-w-wide mx-auto px-5 sm:px-12 gap-x-8">
          {projects.map((project, i) => {
            const isPreload = i / postsPerPage > currentPage - 1;
            return (
              <div
                className={`${
                  isPreload ? '!hidden' : ''
                } work-project-block animate-reveal py-4 mb-8 hover-animate`}
                key={`work-project-${i}`}
                data-ref-type="project"
                data-title={project.node.title}
                ref={workProjectRefs[i]}
              >
                {project.node.featuredImage && (
                  <a className="w-full h-full" href={project.node.link}>
                    <GatsbyImage
                      // className="w-full h-full aspect-[3/2] rounded"
                      className="w-full rounded"
                      href="/"
                      image={getImage(
                        project.node.featuredImage.node.gatsbyImage
                      )}
                      alt={
                        project.node.featuredImage.node.altText ||
                        project.node.title
                      }
                      style={{
                        height: 1,
                        paddingTop: '66.67%',
                      }}
                    />
                  </a>
                )}
                <ProjectBlockDetail project={project.node} />
              </div>
            );
          })}
          <div
            className="h-3"
            data-ref-type="more-projects"
            ref={moreProjectsRef}
          />
        </section>
      </div>
    </PageLayout>
  );
};

export default WorkPageContent;
