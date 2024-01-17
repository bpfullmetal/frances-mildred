import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PageLayout from '../../components/page-layout';
import Helper from '../../helper';

const ProjectSingle = ({ data }) => {

    const { wpProject, nextProject } = data;
    const { title, featuredImage, projectsSingle } = wpProject;
    const positions = ['right', 'left', 'center'];
    let prevPosition;
    let prevSize;

    const [revealProjectInfo, setRevealProjectInfo] = React.useState(false);
    const [projectRefs] = React.useState(
        Array(projectsSingle.projectImages ? projectsSingle.projectImages.length : 0)
            .fill()
            .map((_) => {
                return React.useRef();
            })
    );
    const nextProjectAfterEleRef = React.useRef();
    const imageMaskRef = React.useRef();

    React.useEffect(() => {
        projectRefs.forEach((ref) =>
            Helper.setupIntersectionObserver(ref, handleIntersection, {threshold: .5})
        );
    }, [projectRefs]);

    const handleIntersection = (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting && !entry.isVisible) return;

        entry.target.classList.add('reveal');
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleScroll = () => {
        const imageMaskEle = imageMaskRef.current;
        const nextProjectAfterEle = nextProjectAfterEleRef.current;

        if (imageMaskEle && nextProjectAfterEle) {
            const initialMaskWidth = 660;
            const initialMaskHeight = 440;
            let maskScale = 1;
            let translateX = (window.innerWidth - initialMaskWidth) / 2;
            let translateY = (window.innerHeight - initialMaskHeight) / 2;
            const scrollMovePos =
                window.innerHeight * 1.5 -
                nextProjectAfterEle.getBoundingClientRect().top;

            if (scrollMovePos > 0 && scrollMovePos < window.innerHeight * 1.5) {
                maskScale =
                    1 +
                    ((Math.floor(window.innerWidth / initialMaskWidth) * scrollMovePos) /
                        window.innerHeight) *
                    2;
                if (maskScale > 3) {
                    maskScale = 3;
                }
                translateX =
                    ((window.innerWidth - initialMaskWidth * maskScale) / 2 / maskScale) *
                    1;
                translateY =
                    ((window.innerHeight - initialMaskHeight * maskScale) /
                        2 /
                        maskScale) *
                    1;
                imageMaskEle.style.transform = `scale(${maskScale}) translate(${translateX}px, ${translateY}px)`;
            }
        }
    };

    // const size2Class = {
    //     small: 'w-[360px] h-[480px]',
    //     medium: 'w-[440px] h-[530px] gap-x-2.5',
    //     large: 'w-[680px] h-[830px] gap-x-4',
    //     full: 'w-full my-36 gap-x-6',
    // };

    const size2Class = {
        small: 'w-[360px]',
        medium: 'w-[440px]',
        large: 'w-[680px]',
        full: 'w-full',
    };

    const pos2Class = {
        right: 'mr-0 sm:flex-row sm:mr-20 sm:ml-12 mb-6 md:mb-12 gap-x-12',
        center: 'jusitfy-center mx-auto w-full gap-y-6',
        left: 'sm:flex-row-reverse gap-x-12 ml-0 sm:ml-10',
    };

    // const ContentImages = () => {
    //     let prevPosition = ''
    //     if ( projectsSingle.projectImages?.length ) (
    //         <div className="flex flex-col mt-8 md:mt-20">
    //             {
                    
    //             }
    //         </div>
    //     )
    // }

    const getRandomPosition = () => {
        let position;

        do {
            position = positions[Math.floor(Math.random() * positions.length)];
        } while (position === prevPosition);

        return position;
    }

    const getRandomSize = (currentPosition, orientation = '') => {
        let sizes = ['small', 'medium', 'large', 'full'];
        let size

        switch (currentPosition) {
            case 'right':
            case 'left':
                sizes = orientation === 'portrait' ? ['small', 'medium'] : ['small', 'medium', 'large']
            break
            case 'center':
                sizes = ['large', 'full']
                if ( orientation === 'portrait' ) return 'medium'
            break
        }

        do {
            size = sizes[Math.floor(Math.random() * sizes.length)];
        } while (size === prevSize);

        return size;
    }
    
    prevPosition = getRandomPosition()
    prevSize = getRandomSize('')

    return (
        <PageLayout>
            {
                featuredImage && (
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
                )
            }

            <section className="work-project flex flex-col bg-[#300808]">
                <div className="w-full max-w-main mx-auto px-5 sm:px-12">
                    {
                        !featuredImage && (
                            <h1 className="mx-auto mt-12 mb-12 max-w-[480px] text-3xl font-medium !leading-none text-center md:max-w-[580px] md:text-4xl lg:max-w-[680px] lg:text-[38px] text-center">
                                {title}
                            </h1>
                        )
                    }
                    {wpProject.content && (
                        <div className="flex flex-col mt-8">
                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => setRevealProjectInfo((old) => !old)}
                            >
                                <div
                                    className={`relative flex items-center justify-center w-6 h-6 mr-6 transition-all ease-out duration-300 ${revealProjectInfo ? 'rotate-[135deg]' : 'rotate-0'
                                        }`}
                                >
                                    <div className="absolute w-4 h-0.5 bg-taupe"></div>
                                    <div className="absolute w-0.5 h-4 bg-taupe"></div>
                                </div>
                                <p className="text-taupe text-2xl leading-[44px] sm:text-[26px]">
                                    {projectsSingle.projectDetails.label || 'Project Information'}
                                </p>
                            </div>
                            <div
                                className={`w-[800px] h-0 ${revealProjectInfo ? 'h-full pt-2' : 'pt-0'
                                    } flex flex-col ml-12 overflow-hidden transition-all`}
                            >
                                {projectsSingle.projectDetails.content && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: wpProject.content,
                                        }}
                                    />
                                )}
                                {projectsSingle.projectDetails.attributes && (
                                    <>
                                        {projectsSingle.projectDetails.attributes.map(
                                            (attribute, i) => (
                                                <div key={`project-details-${i}`} className="flex flex-col pt-9">
                                                    {attribute.label && (
                                                        <p className="text-taupe text-xs">
                                                            {attribute.label}
                                                        </p>
                                                    )}
                                                    {attribute.attributeListings && (
                                                        <div className="text-taupe text-2xl leading-[44px] sm:text-[26px]">
                                                            {attribute.attributeListings.map((attItem, a) => {
                                                                return (
                                                                    <div key={`project-attribute-${a}`}>
                                                                        {attItem.link ? (
                                                                            <a target="_blank" href={attItem.link}>
                                                                                {attItem.title}
                                                                            </a>
                                                                        ) : (
                                                                            <>{attItem.title}</>
                                                                        )}
                                                                        {a !==
                                                                            attribute.attributeListings.length -
                                                                            1 && <span>, </span>}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    {
                        projectsSingle.projectImages?.length && (
                            <div className="flex flex-col mt-8 md:mt-20">
                                {

                                    projectsSingle.projectImages.map((block, i) => {
                                        const blockPos = getRandomPosition()
                                        prevPosition = blockPos   
                                        const orientation = block.image 
                                            ? block.image.node.width <= block.image.node.height ? 'portrait' : 'landscape'
                                            : ''
                                        const blockSize = getRandomSize(prevPosition, orientation)
                                        prevSize = blockSize
                                        
                                        return (
                                            <div
                                                ref={projectRefs[i]}
                                                className={`project-block mb-20 md:mb-40 flex flex-col-reverse items-start ${pos2Class[blockPos]} sm:items-center
                                                `}
                                                key={`project-image-${i}`}
                                            >   
                                                <div className="description-reveal flex-1 text-taupe text-sm_extra leading-[24px]">
                                                    {
                                                        block.description && block.description
                                                    }
                                                </div>
                                                {
                                                    block.image && (
                                                        <div
                                                            className={`image-reveal ${size2Class[blockSize]} flex`}
                                                        >
                                                            <GatsbyImage
                                                                className="w-full h-full object-cover"
                                                                image={getImage(
                                                                    block.image.node.gatsbyImage
                                                                )}
                                                                alt={
                                                                    block.image.node.altText ||
                                                                    block.description || `${title} image ${i + 1}`
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            </section>

            {nextProject.nodes.length && (
                <section className="sticky top-0 next-project mb-[50vh]">
                    <a
                        href={nextProject.nodes[0].link}
                        className="flex items-center justify-center w-screen h-screen"
                    >
                        {nextProject.nodes[0].featuredImage && (
                            <GatsbyImage
                                className="static"
                                href={nextProject.nodes[0].link}
                                image={getImage(
                                    nextProject.nodes[0].featuredImage.node.gatsbyImage
                                )}
                                alt={
                                    nextProject.nodes[0].featuredImage.node.altText ||
                                    nextProject.nodes[0].title
                                }
                            />
                        )}
                        <svg width="0" height="0">
                            <clipPath id="next-project-image-mask">
                                <path
                                    ref={imageMaskRef}
                                    d="M 0.034 -0.034 L 660 -0.049 L 660 440 L 0 440 L 0 0 L 0.034 -0.034 Z"
                                />
                            </clipPath>
                        </svg>
                        <p className={`relative max-w-[600px] text-[58px] leading-[58px] text-center${!nextProject.nodes[0].featuredImage && ' text-black'}`}>
                            {nextProject.nodes[0].title}
                        </p>
                    </a>
                </section>
            )}

            <section
                className="next-project-after"
                ref={nextProjectAfterEleRef}
            ></section>
        </PageLayout>
    );
};

export default ProjectSingle;

export const Head = ({ data }) => {
    const { title } = data.wpProject;
    return <title>{title} - Frances Mildred</title>;
};

export const pageQuery = graphql`
  query ProjectWithNextAndPrevious($id: String!, $currentDate: Date!) {
    wpProject(id: { eq: $id }) {
      uri
      title
      date
      id
      content
      featuredImage {
        node {
          altText
          gatsbyImage(
            layout: FULL_WIDTH
            width: 1200
            placeholder: DOMINANT_COLOR
            fit: COVER
            cropFocus: CENTER
          )
        }
      }
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
        projectImages {
          description
          image {
            node {
              gatsbyImage(
                layout: FULL_WIDTH
                width: 1200
                fit: COVER
                cropFocus: CENTER
                placeholder: BLURRED
              )
              width
              height
              altText
            }
          }
          video {
            node {
              gatsbyImage(
                layout: FULL_WIDTH
                width: 800
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
    nextProject: allWpProject(
      sort: {date: DESC}
      filter: { date: { lt: $currentDate }, id: { ne: $id } }
      limit: 1
    ) {
      nodes {
        id
        title
        link
        date
        featuredImage {
          node {
            altText
            gatsbyImage(
              layout: FULL_WIDTH
              width: 800
              placeholder: DOMINANT_COLOR
            )
          }
        }
      }
    }
  }
`;
