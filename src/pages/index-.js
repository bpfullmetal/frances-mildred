import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import HomePageContent from '../components/home';

const HomePage = () => {
  const data = useStaticQuery(graphql`
    {
      wpPage(uri: { eq: "/" }) {
        title
        content
      }
    }
  `);

  const title = data.wpPage?.title || '';
  const content = data.wpPage?.content || '';

  console.log('title: ', title);
  console.log('content: ', content);

  return <HomePageContent content={content} title={title} />;
};

export default HomePage;

export const Head = () => <title>Frances Mildred</title>;
