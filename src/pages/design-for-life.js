import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import DiscoverPageContent from '../components/discover';
import Helper from '../helper';

const DiscoverPage = (props) => {
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
    <DiscoverPageContent
      content={content}
      menuItems={menuItems}
      title={title}
      uri={props.uri}
    />
  );
};

export default DiscoverPage;

export const Head = () => <title>Discover - Frances Mildred</title>;
