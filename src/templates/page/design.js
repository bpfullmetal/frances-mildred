import * as React from 'react';
import { graphql } from 'gatsby';
import PageLayout from '../../components/page-layout';
import CategoryModal from '../../components/discover/category-modal';
import DesignProjectsGrid from '../../components/discover/projects-grid';

const DesignPage = ({ data, location }) => {
  const params = new URLSearchParams(location.search);
  const categoryParam = params.get('category');

  const allProjectsData = data.allWpProject.edges || [];
  const allCategoriesData = data.allWpCategory.edges || [];

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedCat, setSelectedCat] = React.useState(
    data.allWpCategory.edges[0].node
  );
  const [filteredProjects, setFilteredProjects] = React.useState([]);
  const [animationEntrances, setAnimationEntrances] = React.useState({
    background: false,
    title1: false,
    title2: false,
    project: false,
  });

  React.useEffect(() => {
    [500, 1500, 2000, 2500].forEach((ms, i) => {
      setTimeout(
        () =>
          setAnimationEntrances({
            background: i >= 0,
            title1: i >= 1,
            title2: i >= 2,
            project: i >= 3,
          }),
        ms
      );
    });
  }, []);

  React.useEffect(() => {
    const categoryNode = (
      allCategoriesData.find((cat) => cat.node.slug === categoryParam) ||
      allCategoriesData[0]
    )?.node;
    setSelectedCat(categoryNode);

    const matchedProjects = allProjectsData.filter((project) =>
      project.node.categories.nodes.find(
        (category) => category.slug === categoryNode.slug
      )
    );

    setFilteredProjects(matchedProjects);
  }, [allCategoriesData, categoryParam]);

  return (
    <PageLayout className="discover bg-dark_blue" hiddenBookSection>
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
                {selectedCat?.name}
              </span>{' '}
              +
            </p>
          </div>

          {animationEntrances.project && (
            <DesignProjectsGrid
              category={selectedCat?.slug}
              projects={filteredProjects}
            />
          )}
        </div>
      </section>

      {openModal && (
        <CategoryModal
          selectedCat={selectedCat}
          categories={data.allWpCategory.edges}
          onClose={() => setOpenModal(false)}
        />
      )}
    </PageLayout>
  );
};

export default DesignPage;

export const Head = ({ data }) => (
  <title>{`${data.wpPage.title} - Frances Mildred`}</title>
);

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      title
    }
    allWpProject(sort: { date: DESC }) {
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
      filter: { slug: { nin: "uncategorized" }, count: { gt: 0 } }
      sort: { count: ASC }
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
