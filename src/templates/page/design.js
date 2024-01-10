import * as React from 'react';
import PageLayout from '../../components/page-layout';
import CategoryModal from '../../components/discover/category-modal';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const DiscoverPageContent = ({data}) => {
  
  const allProjectsData = data.allWpProject.edges || []

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedCat, setSelectedCat] = React.useState(data.allWpCategory.edges[0].node);
  const [filteredProjects, setFilteredProjects] = React.useState([])
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
        console.log('refreshing')
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setFilteredProjects(allProjectsData.filter(project =>
      project.node.categories.nodes.some(category => category.slug === selectedCat.slug)
    ))
  }, [selectedCat])

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
                { selectedCat.name }
              </span>{' '}
              +
            </p>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, i) => (
              <div
                className="projects-grid__item flex flex-col"
                key={i}
                ref={projectRefs[i]}
              >
                {
                  project.node.featuredImage && (
                    <a className="mb-4" href={project.node.link}>
                      <GatsbyImage
                        image={getImage(project.node.featuredImage.node.gatsbyImage)}
                        alt={project.node.featuredImage ? project.node.featuredImage.node.altText : project.node.title }/>
                      </a>
                  )
                }
                <p className="text-xl leading-none tracking-[0.48px] mb-3 sm:text-[22px]">
                  {project.node.title}
                </p>
                <div className="w-fit text-base !leading-none tracking-[0.32px] uppercase animate-underline sm:text-lg sm:tracking-[0.42px]">
                  <a href={project.node.link}>View Project</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {openModal && <CategoryModal selectedCat={selectedCat} handleSelectCat={setSelectedCat} categories={data.allWpCategory.edges} onClose={() => setOpenModal(false)} />}
    </PageLayout>
  );
};

export default DiscoverPageContent;

export const pageQuery = graphql`
  {
    allWpProject(sort: { date: DESC }) {
      edges {
        node {
          id
          featuredImage {
            node {
              altText
              gatsbyImage(
                layout: CONSTRAINED
                width: 800
                placeholder: BLURRED
              )
            }
          }
          title
          link
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
    allWpCategory(
      filter: {slug: {nin: "uncategorized"}, count: {gt: 0}}
      sort: {count: ASC}
    ) {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
`;