import * as React from 'react';
import ProjectsCarousel from './carousel';
import { graphql, StaticQuery } from 'gatsby';

const BlockProjectsCarousel = ({ data }) => {
  const carouselData = data;

  const slideCount = carouselData.manualSelection
    ? carouselData.projects.length
    : carouselData.projectsMax;

  return (
    <section
      className={`flex flex-col mt-36 mb-20 overflow-x-hidden pl-5 sm:mt-44 sm:pl-12 lg:pl-20 ${
        slideCount < 4 ? 'xl:ml-our_latest_work' : ''
      }`}
    >
      <div className="flex justify-between text-dark_green text-xl leading-tight mb-5 sm:justify-start sm:text-[22px]">
        {carouselData.title && <p>{carouselData.title}</p>}
        <p className="animate-underline ml-6 mr-5">
          <a href="/">View all work</a>
        </p>
      </div>
      {carouselData.manualSelection && carouselData.projects.length && (
        <ProjectsCarousel
          slides={carouselData.projects.map((project) => {
            let image = null
            if ( project.image?.node ) {
              image = project.image.node
            } else {
              if ( project.project.nodes[0].projectSingleAlternateImages.verticalImage ) {
                image = project.project.nodes[0].projectSingleAlternateImages.verticalImage.node
              } else {
                if ( project.project.nodes[0].featuredImage ) {
                  image = project.project.nodes[0].featuredImage.node
                }
              }
            }
            return {
              image: image,
              title: project.title
                ? project.title
                : project.project.nodes[0].title,
              id: project.project.nodes[0].id,
              link: project.project.nodes[0].link,
            };
          })}
        />
      )}
      {!carouselData.manualSelection && (
        <StaticQuery
          query={graphql`
            query {
              allWpProject(limit: 5, sort: { date: DESC }) {
                edges {
                  node {
                    id
                    projectSingleAlternateImages {
                      verticalImage {
                        node {
                          altText
                          gatsbyImage(
                            layout: FULL_WIDTH
                            aspectRatio: 0.775
                            width: 600
                            fit: COVER
                            cropFocus: CENTER
                            placeholder: BLURRED
                          )
                        }
                      }
                    }
                    featuredImage {
                      node {
                        altText
                        gatsbyImage(
                          layout: FULL_WIDTH
                          aspectRatio: 0.775
                          width: 600
                          fit: COVER
                          cropFocus: CENTER
                          placeholder: BLURRED
                        )
                      }
                    }
                    title
                    link
                  }
                }
              }
            }
          `}
          render={(data) => {
            data?.allWpProject?.edges?.length === 0 && <>No projects found</>;
            return (
              <ProjectsCarousel
                slides={data.allWpProject.edges.map((project) => {
                  let image = null
                  if ( project.node.projectSingleAlternateImages.verticalImage ) {
                    image = project.node.projectSingleAlternateImages.verticalImage.node
                  } else {
                    if ( project.node.featuredImage ) {
                      image = project.node.featuredImage.node
                    }
                  }
                  return {
                    image: image,
                    title: project.node.title,
                    id: project.node.id,
                    link: project.node.link,
                  };
                })}
              />
            );
          }}
        />
      )}
    </section>
  );
};

export default BlockProjectsCarousel;
