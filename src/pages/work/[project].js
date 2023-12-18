import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import WorkProjectPageContent from '../../components/work/project';
import Helper from '../../helper';

const WorkProjectPage = (props) => {
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

  console.log('props: ', props);

  return (
    <WorkProjectPageContent
      content={content}
      menuItems={menuItems}
      title={title}
      uri={props.uri}
    />
  );
};

export default WorkProjectPage;

export const Head = () => <title>Work - Frances Mildred</title>;
