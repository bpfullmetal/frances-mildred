import * as React from 'react';
import { graphql } from 'gatsby';
import AboutPageContent from '../../components/about';

const PageDefault = ({ data }) => {
  const { wpPage } = data;
  console.log(wpPage);

  return <AboutPageContent content={''} title={''} />;
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
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      layout: CONSTRAINED
                      width: 800 # Adjust the width as needed
                      placeholder: BLURRED
                    )
                  }
                }
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
