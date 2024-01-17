import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

const ProjectCarouselModal = ({ imageBlocks, onClose }) => {
  return (
    <div className="project-carousel-modal fixed w-screen h-screen top-0">
      <div
        className="absolute w-full h-full bg-[#000000E6]"
        onClick={onClose}
      />

      <Swiper slidesPerView={1}>
        {imageBlocks.map((block, i) => {
          const imageNode = block.image?.node;
          let width = window.innerWidth > 1000 ? 800 : window.innerWidth * 0.8;
          let height = window.innerHeight * 0.8 - 40;
          let isLandscape = imageNode && imageNode.width > imageNode.height;
          const aspectRatio = imageNode
            ? imageNode.width / imageNode.height
            : 0;
          if (imageNode) {
            if (isLandscape) {
              if (width > imageNode.width) {
                width = imageNode.width;
                height = imageNode.height;
              } else {
                const croppedHeight = width / aspectRatio;
                if (croppedHeight > height) {
                  width = height * aspectRatio;
                } else {
                  height = croppedHeight;
                }
              }
            } else {
              if (height > imageNode.height) {
                height = imageNode.height;
                width = imageNode.width;
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
            <SwiperSlide key={i}>
              {block.image && (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <GatsbyImage
                    image={getImage(block.image.node.gatsbyImage)}
                    alt={block.image.node.altText || block.description || ''}
                    style={{ width, height, objectFit: 'cover' }}
                  />
                  <div className="description-reveal text-taupe text-sm_extra leading-[24px] mt-4">
                    {block.description && block.description}
                  </div>
                </div>
              )}
            </SwiperSlide>
          );
        })}

        <SlidePrevBlock />
        <SlideNextBlock />
      </Swiper>
    </div>
  );
};

export default ProjectCarouselModal;

const SlidePrevBlock = () => {
  const swiper = useSwiper();

  return (
    <div
      className="slide-prev-block absolute top-0 w-1/2 h-full"
      onClick={() => swiper.slidePrev()}
    ></div>
  );
};

const SlideNextBlock = () => {
  const swiper = useSwiper();

  return (
    <div
      className="slide-next-block absolute top-0 right-0 w-1/2 h-full"
      onClick={() => swiper.slideNext()}
    ></div>
  );
};
