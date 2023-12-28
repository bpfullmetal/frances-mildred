import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import DiscoverPageContent from '../components/discover';

const DiscoverPage = () => {
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

  return <DiscoverPageContent content={content} title={title} />;
};

export default DiscoverPage;

export const Head = () => <title>Discover - Frances Mildred</title>;
