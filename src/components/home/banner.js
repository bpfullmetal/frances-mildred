import * as React from 'react';
import HomeBannerVideo from '../../assets/images/home-banner.mp4';

const HomeBannerSection = () => {
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

  return (
    <section className="relative h-home_banner" onClick={handleBannerClick}>
      <video autoPlay muted className="absolute w-full h-full object-cover">
        <source src={HomeBannerVideo} type="video/mp4"></source>
      </video>
      <div className="relative h-full flex flex-col items-center justify-center text-white text-4xl uppercase">
        <p className="space-x-[40px]">
          <span>f</span>
          <span>r</span>
          <span>a</span>
          <span>n</span>
          <span>c</span>
          <span>e</span>
          <span>s</span>
        </p>
        <div
          className={`transition-[height] ease-in-out duration-1000 ${
            startAnimate ? 'h-1/2' : 'h-0'
          }`}
        ></div>
        <p className="space-x-[40px]">
          <span>m</span>
          <span>i</span>
          <span>l</span>
          <span>d</span>
          <span>r</span>
          <span>e</span>
          <span>d</span>
        </p>
      </div>
    </section>
  );
};

export default HomeBannerSection;
