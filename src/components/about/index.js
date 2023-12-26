import * as React from 'react';
import AboutBannerVideo from '../../assets/images/about-banner.mp4';
import TeamImage1 from '../../assets/images/home-img-2.png';
import TeamImage2 from '../../assets/images/team-img-2.png';
import TeamImage3 from '../../assets/images/team-img-3.png';
import BookConsultation from '../book-consultation';
import FooterSection from '../footer-section';
import HeaderMenu from '../header-menu';
import TeamStudioFeatured from './team-studio-featured';
import TeamStudioItem from './team-studio-item';

const AboutPageContent = ({ content, menuItems, title, uri }) => {
  const [openedPositions, setOpenedPositions] = React.useState([]);
  const [isPageEntered, setIsPageEntered] = React.useState(false);
  const [byTheNumberIndex, setByTheNumberIndex] = React.useState(-1);
  const [nIntervalId, setNIntervalId] = React.useState(null);
  const [intervalCount, setIntervalCount] = React.useState(0);
  const [teamMembersAnimate, setTeamMembersAnimate] = React.useState(
    Array(4).fill(false)
  );

  const byTheNumberRef = React.useRef();
  const ourTeamRefs = Array(3)
    .fill()
    .map((_) => {
      return React.useRef();
    });
  const teamMemberRefs = Array(4)
    .fill()
    .map((_) => {
      return React.useRef();
    });

  const byTheNumberItems = [
    {
      value: 28,
      name: 'Projects complete',
    },
    {
      value: 11,
      name: 'Humans',
    },
    {
      value: 3,
      name: 'Dogs',
    },
    {
      value: 13,
      name: 'Plants',
    },
  ];

  const openingPositionsData = [
    {
      name: 'Senior Architect',
      desc: [
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text`,
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      ],
    },
    {
      name: 'Account Manager',
      desc: [
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text`,
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      ],
    },
    {
      name: 'Junior Architect',
      desc: [
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text`,
        `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      ],
    },
  ];

  React.useEffect(() => {
    setTimeout(() => setIsPageEntered(true), 500);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (
      !nIntervalId &&
      byTheNumberIndex > -1 &&
      byTheNumberIndex < byTheNumberItems.length
    ) {
      if (intervalCount < 1) {
        const intervalId = setInterval(
          () => setIntervalCount((old) => old + 1),
          1500 / byTheNumberItems[byTheNumberIndex].value
        );
        setNIntervalId(intervalId);
      }
    }
  }, [byTheNumberIndex, byTheNumberItems, intervalCount, nIntervalId]);

  React.useEffect(() => {
    if (
      nIntervalId &&
      byTheNumberIndex > -1 &&
      byTheNumberIndex < byTheNumberItems.length
    ) {
      if (intervalCount >= byTheNumberItems[byTheNumberIndex].value) {
        clearInterval(nIntervalId);
        setTimeout(() => {
          setNIntervalId(null);
          setByTheNumberIndex((old) => old + 1);
          setIntervalCount(0);
        }, 500);
      }
    }
  }, [byTheNumberIndex, byTheNumberItems, intervalCount, nIntervalId]);

  const handleScroll = () => {
    const byTheNumberEle = byTheNumberRef.current;
    if (byTheNumberEle) {
      if (!byTheNumberEle.classList.value.includes('animate')) {
        const scrollOffsetTop = byTheNumberEle.getBoundingClientRect().top;
        if (scrollOffsetTop - window.innerHeight * 0.6 < 0) {
          byTheNumberEle.classList.add('animate');
          setByTheNumberIndex(0);
        }
      }
    }

    ourTeamRefs.forEach((ref, i) => {
      const scrollRevealEle = ref.current;
      if (scrollRevealEle) {
        if (!scrollRevealEle.classList.value.includes(' animate')) {
          const scrollOffsetTop = scrollRevealEle.getBoundingClientRect().top;
          if (scrollOffsetTop - window.innerHeight * 0.8 < 0) {
            if (i === 1) {
              setTimeout(() => scrollRevealEle.classList.add('reveal'), 1000);
            } else {
              scrollRevealEle.classList.add('reveal');
            }
            scrollRevealEle.classList.add('animate');
          }
        }
      }
    });

    teamMemberRefs.forEach((ref, i) => {
      const scrollRevealEle = ref.current;
      if (scrollRevealEle) {
        if (!scrollRevealEle.classList.value.includes('animate')) {
          const scrollOffsetTop = scrollRevealEle.getBoundingClientRect().top;
          if (scrollOffsetTop - window.innerHeight * 0.8 < 0) {
            if (window.innerWidth < 768) {
              setTeamMembersAnimate((old) =>
                Array.from(old).map((v, j) => (i === j ? true : v))
              );
            } else {
              if (i % 2) {
                setTimeout(
                  () =>
                    setTeamMembersAnimate((old) =>
                      Array.from(old).map((v, j) => (i === j ? true : v))
                    ),
                  500
                );
              } else {
                setTeamMembersAnimate((old) =>
                  Array.from(old).map((v, j) => (i === j ? true : v))
                );
              }
            }
            scrollRevealEle.classList.add('animate');
          }
        }
      }
    });
  };

  const handlePositionNameClicked = (posIndex) => {
    if (openedPositions.includes(posIndex)) {
      setOpenedPositions(openedPositions.filter((pos) => pos !== posIndex));
    } else {
      setOpenedPositions([...openedPositions, posIndex]);
    }
  };

  return (
    <main>
      <HeaderMenu menuItems={menuItems} currentURI={uri} />

      <div className="fixed top-[500px] left-12 flex flex-col z-10">
        <div className="uppercase">
          <a href="#about">About</a>
        </div>
        <div className="uppercase">
          <a href="#studio">Studio</a>
        </div>
        <div className="uppercase">
          <a href="#jobs">Jobs</a>
        </div>
      </div>

      <section id="about" className="relative flex">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source src={AboutBannerVideo} type="video/mp4"></source>
        </video>

        <div className="relative w-full max-w-main mx-auto px-5 sm:px-12">
          <div className="relative max-w-[860px] flex flex-col ml-auto">
            <div className="h-screen">
              <p
                className={`animate-reveal text-4xl leading-[45px] pt-[400px] ${
                  isPageEntered ? 'reveal' : ''
                }`}
              >
                This is an area for a short paragraph about Frances Mildred.
                This should be between 50-75 words no longer. Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
              </p>
            </div>
            <div className="h-[60vh]" ref={byTheNumberRef}>
              <p className="text-sm pt-[50px] pb-5">By the number</p>
              {byTheNumberItems.map((item, i) => (
                <p className="text-4xl leading-[40px]" key={i}>
                  {i > byTheNumberIndex
                    ? ''
                    : i === byTheNumberIndex
                    ? intervalCount
                    : item.value}{' '}
                  <span
                    className={`${
                      i < byTheNumberIndex ? 'fade-in' : 'opacity-0'
                    }`}
                  >
                    {item.name}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="studio" className="bg-dark_red py-48">
        <div className="flex justify-end w-full max-w-main mx-auto px-5 sm:px-12">
          <div className="flex justify-end">
            <p
              className="animate-reveal w-[200px] text-[65px] leading-[65px] tracking-[0.65px] mr-10"
              ref={ourTeamRefs[0]}
            >
              Our Team
            </p>
          </div>
          <div className="max-w-[860px] flex flex-col">
            <div className="flex flex-col">
              <div className="animate-reveal" ref={ourTeamRefs[1]}>
                <img src={TeamImage1} alt="our team 1" />
              </div>
              <p
                className="animate-reveal max-w-[280px] text-sm_extra leading-[20px] mt-5"
                ref={ourTeamRefs[2]}
              >
                This is an area for a short introduction about our team members.
              </p>
            </div>

            <div className="flex flex-col mt-48">
              <TeamStudioFeatured
                data={{
                  image: TeamImage2,
                  alt: 'our team 2',
                  name: 'Lauren MacCuaig',
                  role: 'Director',
                  bio: 'Lauren has always had a love for materials, textures, colors, and space. Before creating Frances Mildred, she worked at MADE for a number of years, and at Terrain, a New York based landscape',
                }}
              />
            </div>

            <div className="flex flex-col mt-24 ml-auto">
              <TeamStudioFeatured
                data={{
                  image: TeamImage3,
                  alt: 'our team 3',
                  name: 'Brian Papa',
                  role: 'Director',
                  bio: 'Brian cares most deeply for how things are put together, and the beauty that arises from a careful assembly of materials. Prior to launching Frances Mildred with Lauren.',
                }}
              />
            </div>

            <div className="flex flex-wrap mt-48">
              {Array(4)
                .fill(1)
                .map((_, i) => (
                  <div key={i} ref={teamMemberRefs[i]}>
                    <TeamStudioItem
                      data={{
                        name: 'Jacqui Robbins',
                        role: 'Designer',
                        bio: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
                      }}
                      animate={teamMembersAnimate[i]}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section id="jobs" className="bg-light_gray py-24">
        <div
          id="jobs"
          className="flex justify-end w-full max-w-main mx-auto px-5 sm:px-12"
        >
          <div className="w-full max-w-[860px] flex flex-col">
            <p className="text-[65px] text-black leading-[65px] tracking-[0.65px]">
              Studio Openings
            </p>

            <div className="flex flex-col my-16 space-y-5">
              {openingPositionsData.map((pos, i) => {
                const isOpened = openedPositions.includes(i);
                return (
                  <div className="flex flex-col" key={i}>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handlePositionNameClicked(i)}
                    >
                      <div className="relative flex items-center justify-center w-[30px] h-[30px] border border-black rounded-full mr-2.5">
                        <div className="absolute w-3 h-0.5 bg-black"></div>
                        {!isOpened && (
                          <div className="absolute w-0.5 h-3 bg-black"></div>
                        )}
                      </div>
                      <p className="text-black text-lg">{pos.name}</p>
                    </div>
                    <div
                      className={`h-0 ${
                        isOpened ? 'h-full mt-4' : 'mt-0'
                      } flex flex-col ml-10 space-y-5 overflow-hidden transition-all`}
                    >
                      {pos.desc.map((para, j) => (
                        <p
                          className="text-black text-lg leading-[24px] tracking-[0.18px]"
                          key={j}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full flex flex-col bg-white p-9 rounded">
              <div className="text-black text-2xl leading-[30px] underline">
                <a href="/">How to apply</a>
              </div>
              <p className="text-black text-2xl leading-[30px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text.
              </p>
              <div className="text-black text-sm underline uppercase mt-16">
                <a href="/">Apply here</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookConsultation />
      <FooterSection menuItems={menuItems.filter((item) => item.url !== '/')} />
    </main>
  );
};

export default AboutPageContent;
