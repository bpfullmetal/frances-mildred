import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import AboutPageContent from '../../components/about';

const AboutPage = ({ data }) => {

  const { wpPage, allWpMenuItem } = data;
    console.log('ABOUT TEMPLATE DATA', wpPage)

  const menuItems = allWpMenuItem.nodes.sort((a, b) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  });

  const title = wpPage.title;
  const content = wpPage.content;

  console.log('title: ', title);
  console.log('content: ', content);

  return (
    <AboutPageContent
      content={content}
      menuItems={menuItems}
      title={title}
      uri={wpPage.uid}
    />
  );
};

export default AboutPage;

export const Head = () => <title>About - Frances Mildred</title>;

export const pageQuery = graphql`
  query ($id: String!) {
      wpPage(id: { eq: $id }) {
          content
          contentType {
              node {
                  isFrontPage
                  isPostsPage
              }
          }
          id
          slug
          status
          template {
              templateName
          }
          title
          uri
      }
      allWpMenuItem {
          nodes {
              order
              label
              url
          }
      }
  }`