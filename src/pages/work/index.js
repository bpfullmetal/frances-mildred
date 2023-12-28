import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import WorkPageContent from '../../components/work';

const WorkParentPage = () => {
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

  return <WorkPageContent content={content} title={title} />;
};

export default WorkParentPage;

export const Head = () => <title>Work - Frances Mildred</title>;
