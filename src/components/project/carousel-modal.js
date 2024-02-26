import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import ArrowLeftIcon from '../../assets/images/arrow-left.svg';
import ArrowRightIcon from '../../assets/images/arrow-right.svg';
import CloseIcon from '../../assets/images/close.svg';

const ProjectCarouselModal = ({ imageBlocks, initialSlide, onClose }) => {

  const backgroundRef = React.useRef(null);

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

  const handleClickBackground = (event) => {
    // Check if the click target is the background element or one of its children
    console.log(event.target, backgroundRef.current)
    if (event.target === backgroundRef.current) {
      onClose()
    }
  };

  return (
    <div
      className="project-carousel-modal fixed w-screen h-screen top-0 bg-[#FFFFFFE6] z-20"
      aria-modal={true}
      ref={backgroundRef}
      onClick={handleClickBackground}
    >
      <div
        className="absolute flex items-center justify-center top-6 right-6 cursor-pointer z-[99] w-8 h-8"
        onClick={onClose}
      >
        <img className="w-full h-full" src={CloseIcon} alt="close" />
      </div>

      <Swiper initialSlide={initialSlide} slidesPerView={1}>
        {imageBlocks.map((block, i) => {
          const mediaNode = block.video?.node || block.image?.node;
          let width = window.innerWidth * 0.98;
          let height = window.innerHeight * 0.98;
          let isLandscape = mediaNode && mediaNode.width > mediaNode.height;
          const aspectRatio = mediaNode
            ? mediaNode.width / mediaNode.height
            : 0;
          if (mediaNode) {
            if (isLandscape) {
              const croppedHeight = width / aspectRatio;
              if (croppedHeight > height) {
                width = height * aspectRatio;
              } else {
                height = croppedHeight;
              }
            } else {
              const croppedWidth = height * aspectRatio;
              if (croppedWidth > width) {
                height = width / aspectRatio;
              } else {
                width = croppedWidth;
              }
            }
          }

          let isLargeLandscape = Boolean(
            width > window.innerWidth * 0.98 - 200
          );

          return (
            <SwiperSlide
              className="relative flex justify-center items-center"
              key={i}
            >
              <SlidePrevBlock disabled={i === 0} fixed={isLargeLandscape} />

              {(block.image || block.video) && (
                <div className="flex flex-col items-center justify-center h-full">
                  {block.video ? (
                    <video
                      autoPlay
                      muted
                      loop
                      style={{ width, height, objectFit: 'cover' }}
                    >
                      <source
                        src={block.video.node.mediaItemUrl}
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <GatsbyImage
                      image={getImage(block.image.node.gatsbyImage)}
                      alt={block.image.node.altText || block.description || ''}
                      style={{ width, height, objectFit: 'cover' }}
                    />
                  )}
                </div>
              )}

              <SlideNextBlock
                disabled={i === imageBlocks.length - 1}
                fixed={isLargeLandscape}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProjectCarouselModal;

const SlidePrevBlock = ({ disabled, fixed }) => {
  const swiper = useSwiper();

  return (
    <div
      className={`${disabled ? 'opacity-75' : 'cursor-pointer'} ${
        fixed ? 'absolute left-8' : 'mr-8'
      } z-10`}
      onClick={() => !disabled && swiper.slidePrev()}
    >
      <img src={ArrowLeftIcon} alt="arrow left" />
    </div>
  );
};

const SlideNextBlock = ({ disabled, fixed }) => {
  const swiper = useSwiper();

  return (
    <div
      className={`${disabled ? 'opacity-75' : 'cursor-pointer'} ${
        fixed ? 'absolute right-8' : 'ml-8'
      } z-10`}
      onClick={() => !disabled && swiper.slideNext()}
    >
      <img src={ArrowRightIcon} alt="arrow right" />
    </div>
  );
};
