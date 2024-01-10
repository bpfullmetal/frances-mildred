import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import HomeBannerVideo from '../../assets/images/home-banner.mp4';
import LetterA from '../../assets/js/icons/letter-a';
import LetterC from '../../assets/js/icons/letter-c';
import LetterD from '../../assets/js/icons/letter-d';
import LetterE from '../../assets/js/icons/letter-e';
import LetterF from '../../assets/js/icons/letter-f';
import LetterI from '../../assets/js/icons/letter-i';
import LetterL from '../../assets/js/icons/letter-l';
import LetterM from '../../assets/js/icons/letter-m';
import LetterN from '../../assets/js/icons/letter-n';
import LetterR from '../../assets/js/icons/letter-r';
import LetterS from '../../assets/js/icons/letter-s';

const BlockLogoBanner = ({ data }) => {
  const [startAnimate, setStartAnimate] = React.useState(false);
  const [prevScrollY, setPrevScrollY] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setStartAnimate(true);
    }, 1000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (prevScrollY < 1 && window.scrollY === 1) {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
    setPrevScrollY(window.scrollY);
  };

  const handleBannerClick = () => {
    if (window.scrollY < 1) {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  if (!data.backgroundImage && !data.backgroundVideo) return <></>;

  return (
    <section
      className="relative h-home_banner home-banner"
      onClick={handleBannerClick}
    >
      {data.backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover"
        >
          <source
            src={data.backgroundVideo.node.sourceUrl}
            type="video/mp4"
          ></source>
        </video>
      ) : (
        <GatsbyImage
          className="w-full h-full object-cover absolute"
          image={getImage(data.backgroundImage.node.gatsbyImage)}
          alt={data.backgroundImage.node.altText}
        />
      )}
      <div className="relative h-full flex flex-col items-center justify-center uppercase">
        <div className="flex justify-between w-[400px]">
          <div className="flex justify-center w-8 h-9">
            <LetterF />
          </div>
          <div className="flex justify-center w-8 h-9">
            <LetterR />
          </div>
          <div className="flex justify-center w-8 h-9">
            <LetterA />
          </div>
          <div className="flex justify-center w-8 h-9">
            <LetterN />
          </div>
          <div className="flex justify-center w-8 h-9">
            <LetterC />
          </div>
          <div className="flex justify-center w-8 h-9">
            <LetterE />
          </div>
          <div className="flex justify-center w-8 h-9">
            <LetterS />
          </div>
        </div>
        <div
          className={`transition-[height] ease-in-out duration-1000 ${
            startAnimate ? 'h-1/2' : 'h-10'
          }`}
        ></div>
        <div className="flex justify-between w-[400px]">
          <div className="flex justify-center w-8 h-9">
            <LetterM />
          </div>
          <div className="flex justify-center w-8 h-9">
            <LetterI />
          </div>
          <div className="flex justify-center w-8 h-9">
            <LetterL />
          </div>
          <div className="flex justify-center w-8 h-9">
            <LetterD />
          </div>
          <div className="flex justify-center w-8 h-9">
            <LetterR />
          </div>
          <div className="flex justify-center w-8 h-9">
            <LetterE />
          </div>
          <div className="flex justify-center w-8 h-9">
            <LetterD />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlockLogoBanner;
