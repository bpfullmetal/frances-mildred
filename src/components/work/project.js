import * as React from 'react';
import ProjectDetailImage1 from '../../assets/images/project-detail-1.png';
import ProjectDetailImage2 from '../../assets/images/project-detail-2.png';
import ProjectDetailImage3 from '../../assets/images/project-detail-3.png';
import ProjectDetailImage4 from '../../assets/images/project-detail-4.png';
import ProjectDetailImage5 from '../../assets/images/project-detail-5.png';
import PageLayout from '../page-layout';

const WorkProjectPageContent = () => {
  const imageBlocksData = [
    {
      text: 'Lorem Ipsum is simply dummy text of the interior and architect industry.',
      image: ProjectDetailImage2,
      size: 'medium',
      pos: 'right',
    },
    {
      text: '',
      image: ProjectDetailImage3,
      size: 'full',
      pos: 'center',
    },
    {
      text: 'Lorem Ipsum is simply dummy text of the interior and architect industry.',
      image: ProjectDetailImage4,
      size: 'large',
      pos: 'right',
    },
    {
      text: '',
      image: ProjectDetailImage5,
      size: 'small',
      pos: 'left',
    },
  ];

  const [isPageEntered, setIsPageEntered] = React.useState(false);
  const [revealProjectInfo, setRevealProjectInfo] = React.useState(false);
  const [imageRefs] = React.useState(
    Array(imageBlocksData.length)
      .fill()
      .map((_) => {
        return React.useRef();
      })
  );
  const nextProjectAfterEleRef = React.useRef();
  const imageMaskRef = React.useRef();

  React.useEffect(() => {
    setTimeout(() => setIsPageEntered(true), 500);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    imageRefs.forEach((ref) => {
      const imageEle = ref.current;
      if (imageEle) {
        const scrollOffsetTop = imageEle.getBoundingClientRect().top;
        if (scrollOffsetTop - window.innerHeight * 0.6 < 0) {
          imageEle.classList.add('reveal');
        }
      }
    });

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
    small: 'w-[360px] h-[480px]',
    medium: 'w-[440px] h-[530px]',
    large: 'w-[680px] h-[830px]',
    full: 'w-full my-36',
  };

  const pos2Class = {
    right: 'mr-0 sm:flex-row sm:mr-20',
    center: 'jusitfy-center',
    left: 'sm:flex-row-reverse',
  };

  return (
    <PageLayout>
      <section
        className={`h-screen opacity-0 ${isPageEntered ? 'fade-in' : ''}`}
      >
        <div className="w-full h-full">
          <img
            className="w-full h-full object-cover rounded-none"
            src={ProjectDetailImage1}
            alt="project detail banner"
          />
        </div>
      </section>

      <section className="work-project flex flex-col bg-[#300808]">
        <div className="w-full max-w-main mx-auto px-5 sm:px-12">
          <div className="flex flex-col mt-8">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setRevealProjectInfo((old) => !old)}
            >
              <div
                className={`relative flex items-center justify-center w-6 h-6 mr-6 transition-all ease-out duration-300 ${
                  revealProjectInfo ? 'rotate-[135deg]' : 'rotate-0'
                }`}
              >
                <div className="absolute w-4 h-0.5 bg-taupe"></div>
                <div className="absolute w-0.5 h-4 bg-taupe"></div>
              </div>
              <p className="text-taupe text-2xl leading-[44px] sm:text-[26px]">
                Project Information
              </p>
            </div>
            <div
              className={`w-[800px] h-0 ${
                revealProjectInfo ? 'h-full pt-2' : 'pt-0'
              } flex flex-col ml-12 overflow-hidden transition-all`}
            >
              <p className="text-taupe text-base leading-[21px] tracking-[0.16px] mb-5 sm:text-2xl sm:leading-[28px] sm:tracking-[0.24px] sm:mb-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <p className="text-taupe text-base leading-[21px] tracking-[0.16px] mb-5 sm:text-2xl sm:leading-[28px] sm:tracking-[0.24px] sm:mb-6">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <div className="flex flex-col pt-9">
                <p className="text-taupe text-xs">Collaborators</p>
                <p className="text-taupe text-2xl leading-[44px] sm:text-[26px]">
                  Company Name
                </p>
              </div>
              <div className="flex flex-col pt-9">
                <p className="text-taupe text-xs">Photographer</p>
                <p className="text-taupe text-2xl leading-[44px] sm:text-[26px]">
                  Nicole Franzen
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {imageBlocksData.map((block, i) => (
              <div
                className={`min-h-[90vh] flex flex-col items-start ${
                  block.text ? 'space-x-20' : ''
                } ${block.pos ? pos2Class[block.pos] : ''} sm:items-center`}
                key={`work-project-image-${i}`}
              >
                <div className="flex-1 text-taupe text-sm_extra leading-[24px]">
                  {block.text}
                </div>
                <div
                  className={`image-reveal ${size2Class[block.size]} flex`}
                  ref={imageRefs[i]}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={block.image}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky top-0 next-project mb-[50vh]">
        <div className="flex items-center justify-center w-screen h-screen">
          <img src={ProjectDetailImage1} alt="next project" />
          <svg width="0" height="0">
            <clipPath id="next-project-image-mask">
              <path
                ref={imageMaskRef}
                d="M 0.034 -0.034 L 660 -0.049 L 660 440 L 0 440 L 0 0 L 0.034 -0.034 Z"
              />
            </clipPath>
          </svg>
          <p className="relative max-w-[220px] text-[58px] leading-[58px] text-center">
            Project Name
          </p>
        </div>
      </section>

      <section
        className="next-project-after"
        ref={nextProjectAfterEleRef}
      ></section>
    </PageLayout>
  );
};

export default WorkProjectPageContent;
