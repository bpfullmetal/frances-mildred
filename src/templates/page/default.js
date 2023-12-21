import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import AboutPageContent from '../../components/about';

const PageDefault = ({ data }) => {
    const { wpPage } = data;
    console.log(wpPage)

    return (
        <AboutPageContent
            content={''}
            menuItems={[]}
            title={''}
            uri={''}
        />
        // <></>
    );
};

export default PageDefault;

export const Head = () => <title>About - Frances Mildred</title>;

export const pageQuery = graphql`
  query ($id: String!) {
      wpPage(id: { eq: $id }) {
          id
          title
          content
          contentType {
              node {
                  isFrontPage
                  isPostsPage
              }
          }
          slug
          status
          template {
              templateName
          }
      }
  }`