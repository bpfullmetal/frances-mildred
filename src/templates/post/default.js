import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PageLayout from '../../components/page-layout';

const PostSingle = ({ data }) => {

    const { wpPost } = data;
    const { title, featuredImage } = wpPost;

    return (
        <PageLayout pageData={wpPost}>
            {featuredImage && (
                <section className="h-home_banner">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <GatsbyImage
                            className="w-full h-full object-cover rounded-none"
                            image={getImage(featuredImage.node.gatsbyImage)}
                            alt={featuredImage.node.altText || title}
                        />
                        <h1 className="absolute max-w-[480px] text-4xl font-medium !leading-none text-center md:max-w-[580px] md:text-5xl lg:max-w-[680px] lg:text-[58px]">
                            {title}
                        </h1>
                    </div>
                </section>
            )}
        </PageLayout>
    );
};

export default PostSingle;

export const Head = ({ data }) => {
    const { title } = data.wpPost;
    return <title>{title} - Frances Mildred</title>;
};

export const pageQuery = graphql`
  query post($id: String!) {
    wpPost(id: { eq: $id }) {
      uri
      title
      date
      id
      content
      featuredImage {
        node {
          altText
          mediaItemUrl
          gatsbyImage(
            layout: FULL_WIDTH
            width: 1200
            placeholder: DOMINANT_COLOR
            fit: COVER
            cropFocus: CENTER
          )
        }
      }
    }
  }
`;
