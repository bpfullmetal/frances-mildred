import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import WorkPageContent from '../components/work';
import Helper from '../helper';

const WorkPage = (props) => {
  const data = useStaticQuery(graphql`
    {
      wpPage(uri: { eq: "/" }) {
        title
        content
      }

      allWpMenuItem {
        nodes {
          order
          label
          url
        }
      }
    }
  `);

  const menuItems = Helper.sortMenuItemsByOrder(data.allWpMenuItem.nodes);

  const title = data.wpPage?.title || '';
  const content = data.wpPage?.content || '';

  console.log('title: ', title);
  console.log('content: ', content);

  return (
    <WorkPageContent
      content={content}
      menuItems={menuItems}
      title={title}
      uri={props.uri}
    />
  );
};

export default WorkPage;

export const Head = () => <title>Work - Frances Mildred</title>;
