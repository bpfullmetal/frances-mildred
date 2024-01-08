import * as React from 'react';
import { graphql } from 'gatsby';
import BlockLogoBanner from '../../components/blocks/banner';
import BlockFeaturedProject from '../../components/blocks/featured-project';
import FooterSection from '../../components/footer-section';

const PageDefault = ({ data }) => {
  const { wpPage } = data;
  console.log(wpPage);
  if ( !wpPage ) return <>No page data found</>
  return (
    <div>
      {
        wpPage.editorBlocks && (
          <div>
            {
              wpPage.editorBlocks.map( block => {
                switch (block.__typename) {
                  case 'WpAcfLogoBanner':
                    return <BlockLogoBanner data={block.blockLogoBanner} />
                  case 'WpAcfFeaturedProject':
                    return <BlockFeaturedProject data={block.blockFeaturedProjects} />
                  default:
                    return <div dangerouslySetInnerHTML={{
                      __html: block.renderedHtml,
                    }}></div>
                }
              })
            }
          </div>
        )
      }
      <FooterSection/>
    </div>
  )
};

export default PageDefault;

export const Head = () => <title>About - Frances Mildred</title>;

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      title
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
                gatsbyImage(layout: FULL_WIDTH, width: 800, placeholder: DOMINANT_COLOR)
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
        ... on WpAcfFeaturedProject {
          anchor
          apiVersion
          blockFeaturedProjects {
            projects {
              backgroundImage {
                node {
                  altText
                  gatsbyImage(layout: FULL_WIDTH, width: 800, placeholder: DOMINANT_COLOR)
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
                        gatsbyImage(layout: FULL_WIDTH, width: 800, placeholder: DOMINANT_COLOR)
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
