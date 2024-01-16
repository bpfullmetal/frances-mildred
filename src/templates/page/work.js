import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import WorkPageContent from '../../components/work';

const WorkParentPage = ({ data }) => {
  const { wpPage } = data;

  const title = wpPage?.title || '';
  const content = wpPage?.content || '';

  console.log('title: ', title);
  console.log('content: ', content);

  return <WorkPageContent content={content} title={title} />;
};

export default WorkParentPage;

export const Head = ({ data }) => {
  const { wpPage } = data;
  const title = wpPage?.title || '';
  return <title>{title}- Frances Mildred</title>;
};

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      content
      title
    }
  }
`;
