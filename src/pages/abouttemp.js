import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import AboutPageContent from '../components/about';

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(uri: { eq: "/about/" }) {
        title
        content
      }
    }
  `);

  const title = data.wpPage.title;
  const content = data.wpPage.content;

  console.log('title: ', title);
  console.log('content: ', content);

  return <AboutPageContent content={content} title={title} />;
};

export default AboutPage;

export const Head = () => <title>About - Frances Mildred</title>;
