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

  return <AboutPageContent content={content} title={title} />;
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
