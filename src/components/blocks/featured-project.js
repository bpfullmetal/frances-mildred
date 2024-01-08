import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const BlockFeaturedProject = ({data}) => {

    const getRandomProject = projects => {
        if (!Array.isArray(projects) || projects.length === 0) {
          return null; 
        }
      
        const randomIndex = Math.floor(Math.random() * projects.length);
        return projects[randomIndex];
    }

    const randomProject = getRandomProject(data.projects) 
    
    const projectImage = randomProject.backgroundImage
        ? randomProject.backgroundImage.node
        : randomProject.project
            ? randomProject.project.nodes[0].featuredImage
                ? randomProject.project.nodes[0].featuredImage.node
                : null
            : null
    const projectDescription = randomProject.description
        ? randomProject.description
        : randomProject.project
            ? randomProject.project.nodes[0].title
                ? randomProject.project.nodes[0].title
                : null
            : null
    const projectLink = randomProject.link
        ? randomProject.link
        : randomProject.project
            ? {
                target: '',
                title: 'View Project',
                url: randomProject.project.nodes[0].link
            }
            : null
    
    return (
        <section className="relative flex items-center">
            {
                projectImage && (
                    <GatsbyImage className="min-h-screen w-full rounded-none object-cover" image={getImage(projectImage.gatsbyImage)} alt={projectImage.altText} />
                )
            }
            {
                (projectDescription || projectLink) && (
                    <div className="absolute w-full h-full">
                        <div className="sticky top-[600px] max-w-main mx-auto px-5 pb-40 mt-[600px] sm:px-12">
                            {
                                projectDescription && (
                                    <p className="max-w-[630px] text-white text-3xl leading-[37px] mb-4 sm:text-4xl sm:leading-[44px] lg:pl-8">
                                        { projectDescription }
                                    </p>
                                )
                            }
                            {
                                projectLink && (
                                    <a
                                        className="text-base text-white leading-tight tracking-[0.48px] underline sm:text-2xl lg:pl-8"
                                        href={projectLink.url}
                                    >
                                        {projectLink.title}
                                    </a>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default BlockFeaturedProject;
