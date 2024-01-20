import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

const ProjectCarouselModal = ({ imageBlocks, initialSlide, onClose }) => {
  React.useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();

        onClose();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <div
      className="project-carousel-modal fixed w-screen h-screen top-0 bg-[#000000E6] z-20"
      aria-modal={true}
    >
      <div
        className="absolute w-8 h-8 flex items-center justify-center top-6 right-6 rotate-45 cursor-pointer"
        onClick={onClose}
      >
        <div className="absolute w-8 h-0.5 bg-white"></div>
        <div className="absolute w-0.5 h-8 bg-white"></div>
      </div>

      <Swiper initialSlide={initialSlide} slidesPerView={1}>
        {imageBlocks.map((block, i) => {
          const mediaNode = block.video?.node || block.image?.node;
          let width = window.innerWidth > 1000 ? 800 : window.innerWidth * 0.8;
          let height = window.innerHeight * 0.8 - 40;
          let isLandscape = mediaNode && mediaNode.width > mediaNode.height;
          const aspectRatio = mediaNode
            ? mediaNode.width / mediaNode.height
            : 0;
          if (mediaNode) {
            if (isLandscape) {
              if (width > mediaNode.width) {
                width = mediaNode.width;
                height = mediaNode.height;
              } else {
                const croppedHeight = width / aspectRatio;
                if (croppedHeight > height) {
                  width = height * aspectRatio;
                } else {
                  height = croppedHeight;
                }
              }
            } else {
              if (height > mediaNode.height) {
                height = mediaNode.height;
                width = mediaNode.width;
              } else {
                const croppedWidth = height * aspectRatio;
                if (croppedWidth > width) {
                  height = width / aspectRatio;
                } else {
                  width = croppedWidth;
                }
              }
            }
          }

          return (
            <SwiperSlide className="relative" key={i}>
              <SlidePrevBlock disabled={i === 0} />

              {
                (block.image || block.video) && (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    {
                      block.video 
                      ? <video
                          autoPlay
                          muted
                          loop
                          controls={true}
                          style={{ width, height, objectFit: 'cover' }}
                        >
                            <source
                                src={block.video.node.mediaItemUrl}
                                type="video/mp4"
                            />
                        </video>
                      : <GatsbyImage
                          image={getImage(block.image.node.gatsbyImage)}
                          alt={block.image.node.altText || block.description || ''}
                          style={{ width, height, objectFit: 'cover' }}
                        />
                    }
                    <div className="description-reveal text-taupe text-sm_extra leading-[24px] mt-4">
                      {block.description && block.description}
                    </div>
                  </div>
                )
              }

              <SlideNextBlock disabled={i === imageBlocks.length - 1} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProjectCarouselModal;

const SlidePrevBlock = ({ disabled }) => {
  const swiper = useSwiper();

  return (
    <div
      className={`${
        disabled ? 'slide-prev-block-opacity' : 'slide-prev-block'
      } absolute top-0 w-1/2 h-full z-10`}
      onClick={() => swiper.slidePrev()}
    ></div>
  );
};

const SlideNextBlock = ({ disabled }) => {
  const swiper = useSwiper();

  return (
    <div
      className={`${
        disabled ? 'slide-next-block-opacity' : 'slide-next-block'
      } absolute top-0 right-0 w-1/2 h-full`}
      onClick={() => swiper.slideNext()}
    ></div>
  );
};
