import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
import LogoImage from '../assets/images/placeholder.png';

const SEO = ({ title, description, excerpt, image, url }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    author
                    siteUrl
                }
            }
            wp {
              generalSettings {
                description
              }
            }
        }
      `}
      render={(data) => {
        const {
            title: siteTitle,
            author,
            siteUrl,
            twitterUsername,
        } = data.site.siteMetadata;
        const {
          description: siteDescription
        } = data.wp.generalSettings
        return (
            <Helmet>
                {/* General metadata */}
                <title>{`${siteTitle}${title ? ` - ${title}` : ''}`}</title>
                <meta name="description" content={description || siteDescription} />
                
                {/* Twitter metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                {/* <meta name="twitter:creator" content={twitterUsername} /> */}
                <meta name="twitter:title" content={`${siteTitle}${title ? ` - ${title}` : ''}`} />
                <meta name="twitter:description" content={description || siteDescription} />
                <meta name="twitter:image" content={image || LogoImage} />

                {/* Facebook Open Graph metadata */}
                <meta property="og:title" content={`${siteTitle}${title ? ` - ${title}` : ''}`} />
                <meta property="og:description" content={description || siteDescription} />
                <meta property="og:image" content={image || LogoImage} />
                <meta property="og:url" content={url || siteUrl} />
                <meta property="og:type" content="website" />
            </Helmet>
        )
      }}
    />
  );
};

export default SEO;