import * as React from 'react';
import { graphql } from 'gatsby';
import PageLayout from '../../components/page-layout';
import CategoryModal from '../../components/discover/category-modal';
import DesignProjectsGrid from '../../components/discover/projects-grid';

const DesignPage = ({ data }) => {
  const allProjectsData = data.allWpProject.edges || [];
  const allCategoriesData = data.allWpCategory.edges || [];
  const currentCategory = data.wpCategory ? data.wpCategory.slug : null;

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
    const timingsArray = currentCategory ? [0, 0, 0, 250] : [0, 250, 750, 1250];
    timingsArray.forEach((ms, i) => {
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
  }, [currentCategory]);

  React.useEffect(() => {
    const categoryNode = (
      allCategoriesData.find((cat) => cat.node.slug === currentCategory) ||
      allCategoriesData[0]
    )?.node;
    setSelectedCat(categoryNode);

    const matchedProjects = allProjectsData.filter((project) =>
      project.node.categories.nodes.find(
        (category) => category.slug === categoryNode.slug
      )
    );

    setFilteredProjects(matchedProjects);
  }, [allCategoriesData, currentCategory]);

  return (
    <PageLayout
      className="discover bg-dark_blue"
      options={{ hiddenBookSection: true, currentURI: data.wpPage.uri }}
      pageData={data.wpPage}
    >
      <section
        className={`bg-dark_blue py-32 sm:py-32 min-h-screen ${
          currentCategory
            ? 'no-animation'
            : animationEntrances.background
            ? 'fade-in'
            : ''
        }`}
      >
        <div className="flex flex-col w-full max-w-main mx-auto px-5 sm:px-12">
          <div className="title flex items-center text-3xl leading-[44px] mb-16 sm:text-4xl sm:mb-32">
            <p
              className={
                currentCategory
                  ? 'no-animation'
                  : animationEntrances.title1
                  ? 'fade-in-top'
                  : ''
              }
            >
              Design for &nbsp;
            </p>
            <p
              className={
                currentCategory
                  ? 'no-animation'
                  : animationEntrances.title2
                  ? 'fade-in-top'
                  : ''
              }
            >
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
  query ($id: String!, $categorySlug: String = "") {
    wpPage(id: { eq: $id }) {
      title
      uri
      featuredImage {
        node {
          mediaItemUrl
        }
      }
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
    wpCategory(slug: { eq: $categorySlug }) {
      slug
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
