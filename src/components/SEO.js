import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, StaticQuery } from 'gatsby';
import LogoImage from '../assets/images/placeholder.png';

const SEO = ({ title, description, image, url }) => {
    console.log(title, description, image)
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
        }
      `}
      render={(data) => {
        const {
            title: siteTitle,
            description: siteDescription,
            author,
            siteUrl,
            twitterUsername,
        } = data.site.siteMetadata;
        // console.log(title, siteTitle)
        return (
            <Helmet>
                {/* General metadata */}
                <title>{title || siteTitle}</title>
                <meta name="description" content={description || siteDescription} />
                
                {/* Twitter metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content={twitterUsername} />
                <meta name="twitter:title" content={title || siteTitle} />
                <meta name="twitter:description" content={description || siteDescription} />
                <meta name="twitter:image" content={image || LogoImage} />

                {/* Facebook Open Graph metadata */}
                <meta property="og:title" content={title || siteTitle} />
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