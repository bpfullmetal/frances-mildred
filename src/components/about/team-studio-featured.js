import * as React from 'react';

const TeamStudioFeatured = ({ data }) => {
  const [nameRevealed, setNameRevealed] = React.useState(false);
  const [roleRevealed, setRoleRevealed] = React.useState(false);
  const [bioRevealed, setBioRevealed] = React.useState(false);
  const [readMoreRevealed, setReadMoreRevealed] = React.useState(false);

  const [scrollRevealRefs] = React.useState(
    Array(3)
      .fill()
      .map((_) => {
        return React.useRef();
      })
  );

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    scrollRevealRefs.forEach((ref, i) => {
      const scrollRevealEle = ref.current;
      if (scrollRevealEle) {
        if (!scrollRevealEle.classList.value.includes(' animate')) {
          const scrollOffsetTop = scrollRevealEle.getBoundingClientRect().top;
          if (scrollOffsetTop - window.innerHeight * 0.8 < 0) {
            if (i === 1) {
              setNameRevealed(true);
              setTimeout(() => setRoleRevealed(true), 300);
            } else if (i === 2) {
              setTimeout(() => setBioRevealed(true), 500);
              setTimeout(() => setReadMoreRevealed(true), 800);
            } else {
              scrollRevealEle.classList.add('reveal');
            }
            scrollRevealEle.classList.add('animate');
          }
        }
      }
    });
  };

  return (
    <div className="flex flex-col">
      <div
        className="animate-reveal w-[500px] h-[360px]"
        ref={scrollRevealRefs[0]}
      >
        <img
          className="w-full h-full object-cover"
          src={data.image}
          alt={data.alt}
        />
      </div>
      <div className="text-sm_extra leading-[20px] mt-8">
        <div className="mb-10" ref={scrollRevealRefs[1]}>
          <p
            className={`animate-reveal text-4xl leading-[44px] ${
              nameRevealed ? 'reveal' : ''
            }`}
          >
            {data.name}
          </p>
          <p
            className={`animate-reveal text-4xl leading-[44px] ${
              roleRevealed ? 'reveal' : ''
            }`}
          >
            {data.role}
          </p>
        </div>
        <div className="flex flex-col" ref={scrollRevealRefs[2]}>
          <p
            className={`animate-reveal max-w-[420px] text-sm_extra leading-[20px] tracking-[0.45px] mb-5 ${
              bioRevealed ? 'reveal' : ''
            }`}
          >
            {data.bio}
          </p>
          <a
            className={`animate-reveal w-fit text-sm leading-[20px] tracking-[0.42px] underline uppercase ${
              readMoreRevealed ? 'reveal' : ''
            }`}
            href="/"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamStudioFeatured;
