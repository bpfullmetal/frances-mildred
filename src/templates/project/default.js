import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Helper from '../../helper';
import PageLayout from '../../components/page-layout';
import ProjectCarouselModal from '../../components/project/carousel-modal';

const ProjectSingle = ({ data }) => {
    const { wpProject, nextProject } = data;
    const { title, featuredImage, projectsSingle } = wpProject;
    const positions = ['right', 'left', 'center'];

    const scrollContainerRef = React.useRef();
    const [isMobile, setIsMobile] = React.useState(false);
    const [revealProjectInfo, setRevealProjectInfo] = React.useState(false);
    const [projectRefs] = React.useState(
        Array(
            projectsSingle.projectImages ? projectsSingle.projectImages.length : 0
        )
            .fill()
            .map((_) => {
                return React.useRef();
            })
    );
    const [clickedImageOrder, setClickedImageOrder] = React.useState(-1);
    const [imageBlockPositions, setImageBlockPositions] = React.useState([]);
    const [imageBlockSizes, setImageBlockSizes] = React.useState([]);
    const [imageBlockDetails, setImageBlockDetails] = React.useState([])

    const nextProjectAfterEleRef = React.useRef();
    const imageMaskRef = React.useRef();

    React.useEffect(() => {
        if (!projectsSingle.projectImages) return
        let prevPosition = getRandomPosition();
        let prevSize = getRandomSize();

        const randomPositions = projectsSingle.projectImages.map((_) => {
            const pos = getRandomPosition(prevPosition);
            prevPosition = pos;
            return pos;
        });

        setImageBlockPositions(randomPositions);

        setImageBlockDetails(projectsSingle.projectImages.map((imageBlock, i) => {
            return {
                type: imageBlock.video ? 'video' : 'image',
                isLoaded: false
            }
        }))

        setImageBlockSizes(
            projectsSingle.projectImages.map((imageBlock, i) => {
                const orientation = imageBlock.image
                    ? imageBlock.image.node.width <= imageBlock.image.node.height
                        ? 'portrait'
                        : 'landscape'
                    : imageBlock.video.node.width <= imageBlock.video.node.height
                        ? 'portrait'
                        : 'landscape';
                // const blockSize = getRandomSize(
                //     randomPositions[i],
                //     orientation,
                //     prevSize,
                //     imageBlock.video ? 'video' : 'image'
                // );
               const blockSize = orientation === 'portrait'
                ? ['small']
                : ['large'];
                prevSize = blockSize;
                return blockSize;
            })
        );
    }, [projectsSingle.projectImages]);

    React.useEffect(() => {
        projectRefs.forEach((ref) =>
            Helper.setupIntersectionObserver(ref, handleIntersection, {
                threshold: 0.35,
            })
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

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        handleResize();
    
        // Event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

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

    const size2Class = {
        small: 'w-full md:w-6/12',
        medium: 'w-full md:w-7/12',
        large: 'w-full md:w-8/12',
        full: 'w-full md:w-10/12',
    };

    // const pos2Class = {
    //     right: 'mr-0 sm:flex-row sm:mr-20 sm:ml-12 gap-y-3 mb-18 md:mb-12 gap-x-12',
    //     center: 'jusitfy-center mx-auto w-full gap-y-3 mb-18 md:mb-12 gap-x-12',
    //     left: 'sm:flex-row-reverse gap-x-12 ml-0 sm:ml-10 gap-y-3 mb-18 md:mb-12 gap-x-12',
    // };

    const pos2Class = {
        right: 'mr-0 sm:flex-row gap-y-3 gap-x-12',
        center: 'jusitfy-center mx-auto w-full gap-y-3 gap-x-12',
        left: 'sm:flex-row-reverse gap-x-12 ml-0 gap-y-3 gap-x-12',
    };

    const getRandomPosition = (prevPosition = -1) => {
        let position;

        do {
            position = positions[Math.floor(Math.random() * positions.length)];
        } while (position === prevPosition);

        return position;
    };

    const getRandomSize = (currentPosition, orientation = '', prevSize = -1, type) => {
        let sizes = ['small', 'medium', 'large', 'full'];
        let size;

        // switch (currentPosition) {
        //     case 'right':
        //     case 'left':
        //         if (type === 'video') {
        //             sizes = ['large']
        //         } else {
        //             sizes =
        //                 orientation === 'portrait'
        //                     ? ['small', 'medium']
        //                     : ['small', 'medium', 'large'];
        //         }
        //         break;
        //     case 'center':
        //         sizes = ['large', 'full'];
        //         if (orientation === 'portrait') return 'medium';
        //         break;
        // }
        sizes =
                        orientation === 'portrait'
                            ? ['small', 'medium']
                            : ['small', 'medium', 'large'];

        do {
            size = sizes[Math.floor(Math.random() * sizes.length)];
        } while (size === prevSize);

        return size;
    };
    
    return (
        <PageLayout options={ { currentURI: '/work/', scrollIndicator: scrollContainerRef } } pageData={wpProject}>
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

            <section className="work-project flex flex-col bg-[#300808]">
                <div className="w-full max-w-main mx-auto px-5 sm:px-12 pb-16 sm:pb-40">
                    {!featuredImage && (
                        <h1 className="mx-auto mt-12 mb-12 max-w-[480px] text-3xl font-medium !leading-none text-center md:max-w-[580px] md:text-4xl lg:max-w-[680px] lg:text-[38px] text-center">
                            {title}
                        </h1>
                    )}
                    {
                        (wpProject.content || projectsSingle?.projectDetails?.attributes?.length) && (
                            <div className="flex flex-col mt-8">
                                <div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => setRevealProjectInfo((old) => !old)}
                                >
                                    <div
                                        className={`relative flex items-center justify-center w-6 h-6 mr-2 sm:mr-6 transition-all ease-out duration-300 ${revealProjectInfo ? 'rotate-[135deg]' : 'rotate-0'
                                            }`}
                                    >
                                        <div className="absolute w-4 h-0.5 bg-taupe"></div>
                                        <div className="absolute w-0.5 h-4 bg-taupe"></div>
                                    </div>
                                    <p className="text-taupe text-xl leading-[44px] sm:text-[26px]">
                                        {projectsSingle.projectDetails.label || 'Project Information'}
                                    </p>
                                </div>
                                <div
                                    className={`text-taupe w-full md:w-1/2 h-0 ${revealProjectInfo ? 'h-full pt-2' : 'pt-0'
                                        } flex flex-col pl-8 sm:pl-12 pr-4 md:pr-0 overflow-hidden transition-all`}
                                >
                                    {wpProject.content && (
                                        <div
                                            className="space-y-12"
                                            dangerouslySetInnerHTML={{
                                                __html: wpProject.content,
                                            }}
                                        />
                                    )}
                                    {projectsSingle.projectDetails.attributes && (
                                        <div className="project-details">
                                            {projectsSingle.projectDetails.attributes.map(
                                                (attribute, i) => (
                                                    <div
                                                        key={`project-details-${i}`}
                                                        className="flex flex-col pt-9 space-y-2"
                                                    >
                                                        {attribute.label && (
                                                            <p className="text-taupe text-xs">
                                                                {attribute.label}
                                                            </p>
                                                        )}
                                                        {attribute.attributeListings && (
                                                            <div className="text-taupe text-lg leading-[34px] sm:text-[20px]">
                                                                {attribute.attributeListings.map((attItem, a) => {
                                                                    return (
                                                                        <div key={`project-attribute-${a}`}>
                                                                            {attItem.link ? (
                                                                                <a target="_blank" href={attItem.link}>
                                                                                    <span>{attItem.title}</span>
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
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }
                    {projectsSingle.projectImages?.length && (
                        <div id="project-images-container" ref={scrollContainerRef} className="flex flex-col mt-8 md:mt-20">
                            {projectsSingle.projectImages.map((block, i) => {
                                const blockPos = imageBlockPositions[i];
                                const blockSize = imageBlockSizes[i];
                                const imageBlock = block.image ? block.image : block.video
                                if (!imageBlock) return <></>
                                const orientation = imageBlock.node.width <= imageBlock.node.height
                                    ? 'portrait'
                                    : 'landscape'
                                return (
                                    <div
                                        ref={projectRefs[i]}
                                        className={`project-block${projectsSingle.projectImages.length !== i + 1 ? ' mb-20 md:mb-40' : ''} flex flex-col-reverse items-start ${pos2Class[blockPos]} sm:items-center
                                                `}
                                        key={`project-image-${i}`}
                                    >
                                        <div className="description-reveal flex-1 text-taupe text-sm_extra leading-[24px]">
                                            {block.description && block.description}
                                        </div>
                                        {(block.image || block.video) && (
                                            <div
                                                className={`image-reveal image-to-lightbox ${size2Class[blockSize]} flex`}
                                                onClick={() => !isMobile ? setClickedImageOrder(i) : null}
                                            >
                                                {
                                                    block.video
                                                        ? (
                                                            <div>
                                                                <video
                                                                    autoPlay
                                                                    muted
                                                                    loop
                                                                    onLoadedData={() => setImageBlockDetails(imageBlockDetails.map((item, index) =>
                                                                        index === i ? { ...item, isLoaded: true } : item
                                                                    ))}
                                                                    className="w-full h-full"
                                                                >
                                                                    <source
                                                                        src={block.video.node.mediaItemUrl}
                                                                        type="video/mp4"
                                                                    />
                                                                </video>
                                                            </div>
                                                        )
                                                        : <GatsbyImage
                                                            className={`w-full h-full object-cover rounded ${orientation === 'landscape' ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}
                                                            image={getImage(block.image.node.gatsbyImage)}
                                                            alt={
                                                                block.image.node.altText ||
                                                                block.description ||
                                                                `${title} image ${i + 1}`
                                                            }
                                                        />
                                                }
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {nextProject.nodes.length && (
                <section className={`${ !isMobile ? ' next-project mb-[50vh] sticky top-0' : ''}`}>
                    <div
                        className={`flex items-center flex-col items-baseline md:items-center md:justify-center relative ${ !isMobile ? 'w-screen h-screen' : 'py-32 px-8'}`}
                    >
                        {nextProject.nodes[0].featuredImage && (
                            <a href={nextProject.nodes[0].link} className={ !isMobile ? 'static' : 'relative w-full h-auto' }>
                                <GatsbyImage
                                    loading="eager"
                                    className={ !isMobile ? '!static' : 'relative w-full h-auto' }
                                    href={nextProject.nodes[0].link}
                                    image={getImage(
                                        nextProject.nodes[0].featuredImage.node.gatsbyImage
                                    )}
                                    alt={
                                        nextProject.nodes[0].featuredImage.node.altText ||
                                        nextProject.nodes[0].title
                                    }
                                />
                            </a>
                        )}
                        <svg width="0" height="0">
                            <clipPath id="next-project-image-mask">
                                <path
                                    ref={imageMaskRef}
                                    d="M 0.034 -0.034 L 660 -0.049 L 660 440 L 0 440 L 0 0 L 0.034 -0.034 Z"
                                />
                            </clipPath>
                        </svg>
                        <p className={`mt-4 md:mt-0 md:mb-8 text-[12px] tracking-[4px] sm:text-lg uppercase relative ${(!nextProject.nodes[0].featuredImage || isMobile) ? 'text-black' : 'text-white'}`}>Next Project</p>
                        <p
                            className={`relative max-w-[600px] text-lg md:text-[58px] md:leading-[58px] md:text-center${(!nextProject.nodes[0].featuredImage || isMobile) ? ' text-black' : ''}`}
                        >
                            <a href={nextProject.nodes[0].link}>{nextProject.nodes[0].title}</a>
                        </p>
                        {
                            isMobile && <a className="uppercase text-black" href={nextProject.nodes[0].link}>View project</a>
                        }
                    </div>
                </section>
            )}

            <section
                className="next-project-after"
                ref={nextProjectAfterEleRef}
            ></section>

            {
                clickedImageOrder > -1 && (
                    <ProjectCarouselModal
                        imageBlocks={projectsSingle.projectImages}
                        initialSlide={clickedImageOrder}
                        onClose={() => setClickedImageOrder(-1)}
                    />
                )
            }
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
      excerpt
      featuredImage {
        node {
          mediaItemUrl
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
              mediaItemUrl
              width
              height
            }
          }
        }
      }
    }
    nextProject: allWpProject(
      sort: { date: DESC }
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
              width: 1200
              placeholder: DOMINANT_COLOR
              fit: COVER
              cropFocus: CENTER
            )
          }
        }
      }
    }
  }
`;
