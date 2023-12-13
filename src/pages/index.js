import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import HomePageContent from '../components/home';
import Helper from '../helper';

const HomePage = (props) => {
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
    <HomePageContent
      content={content}
      menuItems={menuItems}
      title={title}
      uri={props.uri}
    />
  );
};

export default HomePage;

export const Head = () => <title>Frances Mildred</title>;
