import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import Helper from '../../../../helper';

const ProjectsCarousel = (props) => {
  const slides = props.slides;
  const carouselRef = React.useRef();

  const [carouselSlideRefs] = React.useState(
    Array(slides.length)
      .fill()
      .map((_) => {
        return React.useRef();
      })
  );

  React.useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0.5, // Trigger when 50% of the target is in the viewport
    };

    Helper.setupIntersectionObserver(carouselRef, handleIntersection, options);
  }, []);

  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    if (carouselRef.current) {
      carouselSlideRefs.forEach((ref, i) => {
        const slideItemRef = ref.current;
        if (slideItemRef) {
          setTimeout(() => slideItemRef.classList.add('fade-in'), 500 * i);
        }
      });
    }
  };

  return (
    <div className="project-carousel -ml-2.5 sm:ml-0" ref={carouselRef}>
      <Swiper slidesPerView={'auto'} spaceBetween={4}>
        {slides.map((project, i) => (
          <SwiperSlide key={project.id}>
            <div className="flex flex-col px-2 sm:px-0.5">
              <div
                ref={carouselSlideRefs[i]}
                className="swiper-slide-image bg-[#f8f8f8] rounded aspect-[5/7]"
              >
                {project.image && (
                  <a href={project.link}>
                    <GatsbyImage
                      image={getImage(project.image.gatsbyImage)}
                      alt={project.image.altText || project.title}
                    />
                  </a>
                )}
              </div>
              <div className="flex flex-col flex-wrap items-start text-dark_green">
                <a className="text-lg leading-[20px] tracking-[0.4px] mt-2 mr-3 sm:text-lg sm:tracking-[0.48px] sm:mr-7 hover:underline" href={project.link}>
                  {project.title}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectsCarousel;
