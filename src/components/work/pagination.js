import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const ProjectPagination = ({id, date}) => {
    console.log('id', id, 'date', date)
    
          return <></>
    return (
        {
            // nextProject.nodes.length && (
            //     <section className="sticky top-0 next-project mb-[50vh]">
            //     <div className="flex items-center justify-center w-screen h-screen">
            //         <a href={nextProject.nodes[0].link}>
            //         <img src={ProjectDetailImage1} alt="next project" />
            //         <svg width="0" height="0">
            //             <clipPath id="next-project-image-mask">
            //             <path
            //                 ref={imageMaskRef}
            //                 d="M 0.034 -0.034 L 660 -0.049 L 660 440 L 0 440 L 0 0 L 0.034 -0.034 Z"
            //             />
            //             </clipPath>
            //         </svg>
            //         <p className="relative max-w-[600px] text-[58px] leading-[58px] text-center">
            //             {nextProject.nodes[0].title}
            //         </p>
            //         </a>
            //     </div>
            //     </section>
            // )
        }
    );
};

export default ProjectPagination;
export const pageQuery = graphql`
query ProjectWithNextAndPrevious ($id: String!) {
    wpProject(id: { eq: $id }) {
      uri
      title
      date 
      id
      projectsSingle {
        projectDetails {
          attributes {
            attributeListings {
              link
              title
            }
            label
          }
          content
          label
        }
      }
    }
  }
`;