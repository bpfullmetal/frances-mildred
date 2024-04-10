import * as React from 'react';
import { graphql } from 'gatsby';
import HeaderMenu from '../../components/header-menu';
import SEO from '../../components/SEO';
import FooterSection from '../../components/footer-section';

const ContactPage = ({ data }) => {
  const { wpPage } = data;
  // const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  // const contactInfo = wp?.settings?.fmSettings?.contactInfo || {};
  
  return (
    <>
      {
        <SEO
          title={wpPage.title}
          description={`Frances Mildred - ${wpPage.title}`}
          image={ wpPage?.featuredImage ? wpPage.featuredImage.node.mediaItemUrl : null }
          url={wpPage.uri}
        />
      }
      <main className="min-h-screen flex flex-col">
        <HeaderMenu options={ { currentURI: wpPage.uri } } />
        <FooterSection showMenu={false}/>
      </main>
    </>
  );
};

export default ContactPage;

export const Head = ({ data }) => (
  <title>{`${data.wpPage.title} - Frances Mildred`}</title>
);

export const pageQuery = graphql`
  query ($id: String!) {
    wpPage(id: { eq: $id }) {
      uri
      title
      featuredImage {
        node {
          mediaItemUrl
        }
      }
    }
  }
`;
