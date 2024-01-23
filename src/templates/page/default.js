import * as React from 'react';
import { graphql } from 'gatsby';
import BlockLogoBanner from '../../components/blocks/banner';
import BlockFeaturedProject from '../../components/blocks/featured-project';
import BlockFeaturedContent from '../../components/blocks/featured-content';
import BlockProjectsCarousel from '../../components/blocks/projects-carousel';
import FooterSection from '../../components/footer-section';
import HeaderMenu from '../../components/header-menu';
import PageLayout from '../../components/page-layout';

const PageDefault = ({ data }) => {
  const { wpPage } = data;
  const [shouldRenderHeader, setShouldRenderheader] = React.useState(true);
  if (!wpPage) return <>No page data found</>;

  React.useEffect(() => {
    if ( wpPage.editorBlocks ) {
      const hasHeader = wpPage.editorBlocks.find(
        block => block.__typename === 'WpAcfHeaderNav'
      )
      if ( hasHeader) {
        setShouldRenderheader(false)
      }
    }
  }, [])
  console.log(shouldRenderHeader, 'render')

  return (
    <PageLayout className="default-page" options={{ 'hiddenHeader': !shouldRenderHeader } }>
      {wpPage.editorBlocks && (
        <div>
          {wpPage.editorBlocks.filter(
            (block) => block.__typename === 'WpAcfHeaderNav'
          ).length === 0 && <HeaderMenu currentURI={wpPage.uri} />}
          {wpPage.editorBlocks.map((block, i) => {
            switch (block.__typename) {
              case 'WpAcfLogoBanner':
                return (
                  <BlockLogoBanner
                    key={`${block.__typename}-${i}`}
                    data={block.blockLogoBanner}
                  />
                );
              case 'WpAcfFeaturedProject':
                return (
                  <BlockFeaturedProject
                    key={`${block.__typename}-${i}`}
                    data={block.blockFeaturedProjects}
                  />
                );
              case 'WpAcfFeaturedContent':
                return (
                  <BlockFeaturedContent
                    key={`${block.__typename}-${i}`}
                    data={block.blockFeaturedContent}
                  />
                );
              case 'WpAcfProjectsCarousel':
                return (
                  <BlockProjectsCarousel
                    key={`${block.__typename}-${i}`}
                    data={block.blockProjectsCarousel}
                  />
                );
              case 'WpAcfHeaderNav':
                return (
                  <HeaderMenu
                    key={`${block.__typename}-${i}`}
                    currentURI={wpPage.uri}
                  />
                );
              default:
                return (
                  <div
                    key={`${block.__typename}-${i}`}
                    dangerouslySetInnerHTML={{
                      __html: block.renderedHtml,
                    }}
                  ></div>
                );
            }
          })}
        </div>
      )}
    </PageLayout>
  );
};

export default PageDefault;

export const Head = ({ data }) => (
  <title>{`${data.wpPage.title} - Frances Mildred`}</title>
);

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      title
      uri
      editorBlocks {
        renderedHtml
        __typename
        ... on WpCoreParagraph {
          attributes {
            content
          }
        }
        ... on WpAcfLogoBanner {
          blockLogoBanner {
            backgroundImage {
              node {
                gatsbyImage(
                  layout: FULL_WIDTH
                  width: 1200
                  placeholder: BLURRED
                  fadeIn: false
                )
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
                caption
                description
                title
              }
            }
            backgroundVideo {
              node {
                mediaItemUrl
              }
            }
          }
        }
        ... on WpAcfHeaderNav {
          anchor
          apiVersion
        }
        ... on WpAcfFeaturedProject {
          anchor
          apiVersion
          blockFeaturedProjects {
            projects {
              backgroundImage {
                node {
                  altText
                  gatsbyImage(
                    layout: FULL_WIDTH
                    width: 800
                    placeholder: DOMINANT_COLOR
                  )
                }
              }
              description
              link {
                target
                title
                url
              }
              project {
                nodes {
                  ... on WpProject {
                    id
                    featuredImage {
                      node {
                        altText
                        gatsbyImage(
                          layout: FULL_WIDTH
                          width: 800
                          placeholder: DOMINANT_COLOR
                        )
                      }
                    }
                    title # TODO Switch to EXCERPT
                    link
                  }
                }
              }
            }
          }
        }
        ... on WpAcfFeaturedContent {
          anchor
          apiVersion
          blockFeaturedContent {
            content {
              contentType
              imageBlock {
                image {
                  node {
                    altText
                    gatsbyImage(
                      layout: FULL_WIDTH
                      width: 800
                      placeholder: BLURRED
                    )
                  }
                }
                link {
                  target
                  title
                  url
                }
              }
              text
            }
            title
          }
        }
        ... on WpAcfProjectsCarousel {
          anchor
          apiVersion
          blockProjectsCarousel {
            manualSelection
            projects {
              image {
                node {
                  altText
                  gatsbyImage(
                    layout: FULL_WIDTH
                    aspectRatio: 0.775
                    width: 600
                    fit: COVER
                    cropFocus: CENTER
                    placeholder: BLURRED
                  )
                }
              }
              project {
                nodes {
                  ... on WpProject {
                    id
                    featuredImage {
                      node {
                        gatsbyImage(
                          layout: FULL_WIDTH
                          aspectRatio: 0.775
                          width: 600
                          fit: COVER
                          cropFocus: CENTER
                          placeholder: BLURRED
                        )
                        altText
                      }
                    }
                    link
                    title
                  }
                }
              }
              title
            }
            projectsMax
            title
          }
        }
      }
      content
      contentType {
        node {
          isFrontPage
          isPostsPage
        }
      }
      slug
      status
      template {
        templateName
      }
    }
  }
`;
