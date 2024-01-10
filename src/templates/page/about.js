import * as React from 'react';
import { graphql } from 'gatsby';
import AboutPageContent from '../../components/about';

const AboutPage = ({ data }) => {
  const { wpPage } = data;
  console.log('ABOUT TEMPLATE DATA', wpPage);

  const title = wpPage.title;
  const content = wpPage.content;

  console.log('title: ', title);
  console.log('content: ', content);

  return <AboutPageContent content={wpPage} title={title} />;
};

export default AboutPage;

export const Head = () => <title>About - Frances Mildred</title>;

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      content
      contentType {
        node {
          isFrontPage
          isPostsPage
        }
      }
      template {
        ... on WpTemplate_About {
          templateName
          pageAbout {
            intro {
              introText
              byTheNumber {
                heading
                metrics {
                  count
                  metric
                }
              }
              backgroundVideo {
                node {
                  mediaItemUrl
                  publicUrl
                }
              }
              backgroundImage {
                node {
                  gatsbyImage(
                    layout: CONSTRAINED
                    width: 800
                    placeholder: BLURRED
                  )
                }
              }
              menuName
            }
            ourTeam {
              menuName
              description
              featuredImage {
                node {
                  gatsbyImage(
                    layout: CONSTRAINED
                    width: 800
                    placeholder: BLURRED
                  )
                }
              }
              featuredTeamMembers {
                bio
                bioMore
                role
                image {
                  node {
                    altText
                    gatsbyImage(
                      layout: CONSTRAINED
                      width: 800
                      placeholder: BLURRED
                    )
                  }
                }
                name
              }
              teamMembers {
                bio
                bioMore
                role
                name
              }
            }
            studioOpenings {
              menuName
              jobsNoListings {
                heading
                textContent
              }
              jobListings {
                active
                applicationLink
                description
                howToApply
                title
              }
            }
          }
        }
      }
      id
      slug
      status
      template {
        templateName
      }
      title
      uri
    }
  }
`;

// localFile {
//   childImageSharp {
//     gatsbyImageData(
//       layout: CONSTRAINED
//       width: 800
//       placeholder: BLURRED
//     )
//   }
// }
