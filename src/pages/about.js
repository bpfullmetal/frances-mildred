import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import AboutPageContent from '../components/about';

const AboutPage = (props) => {
  const data = useStaticQuery(graphql`
    {
      wpPage(uri: { eq: "/about/" }) {
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

  const menuItems = data.allWpMenuItem.nodes.sort((a, b) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  });

  const title = data.wpPage.title;
  const content = data.wpPage.content;

  console.log('title: ', title);
  console.log('content: ', content);

  return (
    <AboutPageContent
      content={content}
      menuItems={menuItems}
      title={title}
      uri={props.uri}
    />
  );
};

export default AboutPage;

export const Head = () => <title>About - Frances Mildred</title>;
