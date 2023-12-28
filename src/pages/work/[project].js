import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import WorkProjectPageContent from '../../components/work/project';

const WorkProjectPage = () => {
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

  return <WorkProjectPageContent content={content} title={title} />;
};

export default WorkProjectPage;

export const Head = () => <title>Work - Frances Mildred</title>;
