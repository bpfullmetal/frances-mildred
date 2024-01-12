import * as React from 'react';
import AboutBannerVideo from '../../assets/images/about-banner.mp4';
import TeamImage1 from '../../assets/images/home-img-2.png';
import PageLayout from '../page-layout';
import TeamStudioFeatured from './team-studio-featured';
import TeamStudioItem from './team-studio-item';
import OpeningJobItem from './opening-job-item';

const AboutPageContent = (pageData) => {
  const { intro, ourTeam, studioOpenings } =
    pageData.content.template.pageAbout;

  const [isPageEntered, setIsPageEntered] = React.useState(false);
  const [currentNavMenuItem, setCurrentNavMenuItem] = React.useState('about');
  const [byTheNumberIndex, setByTheNumberIndex] = React.useState(-1);
  const [nIntervalId, setNIntervalId] = React.useState(null);
  const [jobListings, setJobListings] = React.useState([]);
  const [intervalCount, setIntervalCount] = React.useState(0);
  const [teamMembersAnimate, setTeamMembersAnimate] = React.useState(
    Array(4).fill(false)
  );

  const stringToSlug = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
  };

  let navMenuItems = [];
  let sectionsArray = [];

  if (intro.menuName) {
    sectionsArray.push(intro.menuName);
    navMenuItems.push({
      id: stringToSlug(intro.menuName),
      name: intro.menuName,
      link: `#${stringToSlug(intro.menuName)}`,
    });
  }
  if (ourTeam.menuName) {
    sectionsArray.push(ourTeam.menuName);
    navMenuItems.push({
      id: stringToSlug(ourTeam.menuName),
      name: ourTeam.menuName,
      link: `#${stringToSlug(ourTeam.menuName)}`,
    });
  }
  if (studioOpenings.menuName) {
    sectionsArray.push(studioOpenings.menuName);
    navMenuItems.push({
      id: stringToSlug(studioOpenings.menuName),
      name: studioOpenings.menuName,
      link: `#${stringToSlug(studioOpenings.menuName)}`,
    });
  }

  const navSectionRefs = Array(3)
    .fill()
    .map((_) => {
      return React.useRef();
    });
  const byTheNumberRef = React.useRef();
  const ourTeamRefs = Array(3)
    .fill()
    .map((_) => {
      return React.useRef();
    });
  const teamMemberRefs = Array(ourTeam.teamMembers.length)
    .fill()
    .map((_) => {
      return React.useRef();
    });
  const openingsTitleRef = React.useRef();

  React.useEffect(() => {
    setJobListings(studioOpenings.jobListings.filter((job) => job.active));

    setTimeout(() => setIsPageEntered(true), 500);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const byTheNumberEle = byTheNumberRef.current;
    if (byTheNumberEle) {
      if (!byTheNumberEle.classList.value.includes('animate')) {
        setTimeout(() => {
          byTheNumberEle.classList.add('animate');
          setByTheNumberIndex(0);
        }, 1000);
      }
    }
  }, [byTheNumberRef]);

  React.useEffect(() => {
    const setupIntersectionObserver = (arrayRefs) => {
      const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin
        threshold: 0.3, // Trigger when 50% of the target is in the viewport
      };

      if (arrayRefs.filter((ref) => !ref.hasObserver).length > 0) {
        arrayRefs.forEach((ref) => {
          const observer = new IntersectionObserver(
            handleIntersection,
            options
          );
          if (ref.current) {
            observer.observe(ref.current);
            ref.hasObserver = true;
          }
          return () => {
            observer.unobserve(ref.current);
            ref.hasObserver = false;
          };
        });
      }
    };

    setupIntersectionObserver(navSectionRefs);
    setupIntersectionObserver(teamMemberRefs);
  }, [navSectionRefs, teamMemberRefs]);

  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (!entry.isIntersecting && !entry.isVisible) return;

    const revealEl = entry.target;
    switch (entry.target.getAttribute('data-animate-ref')) {
      case 'team-member':
        const teamMemberIndex = parseInt(
          entry.target.getAttribute('data-index')
        );
        if (!revealEl.classList.value.includes('animate')) {
          if (window.innerWidth < 768) {
            setTeamMembersAnimate((old) =>
              Array.from(old).map((v, j) => (teamMemberIndex === j ? true : v))
            );
          } else {
            if (teamMemberIndex % 2) {
              setTimeout(
                () =>
                  setTeamMembersAnimate((old) =>
                    Array.from(old).map((v, j) =>
                      teamMemberIndex === j ? true : v
                    )
                  ),
                500
              );
            } else {
              setTeamMembersAnimate((old) =>
                Array.from(old).map((v, j) =>
                  teamMemberIndex === j ? true : v
                )
              );
            }
          }
          revealEl.classList.add('animate');
        }
        setCurrentNavMenuItem(navMenuItems[1].id);
        break;
      case 'section':
        const sectionIndex = parseInt(
          revealEl.getAttribute('data-section-index')
        );
        setCurrentNavMenuItem(navMenuItems[sectionIndex].id);
        break;
    }
  };

  React.useEffect(() => {
    if (
      !nIntervalId &&
      byTheNumberIndex > -1 &&
      byTheNumberIndex < intro.byTheNumber.metrics.length
    ) {
      if (intervalCount < 1) {
        const intervalId = setInterval(
          () => setIntervalCount((old) => old + 1),
          1000 / intro.byTheNumber.metrics[byTheNumberIndex].count / 10
        );
        setNIntervalId(intervalId);
      }
    }
  }, [byTheNumberIndex, intro.byTheNumber.metrics, intervalCount, nIntervalId]);

  React.useEffect(() => {
    if (
      nIntervalId &&
      byTheNumberIndex > -1 &&
      byTheNumberIndex < intro.byTheNumber.metrics.length
    ) {
      if (
        intervalCount >=
        intro.byTheNumber.metrics[byTheNumberIndex].count * 10
      ) {
        clearInterval(nIntervalId);
        setTimeout(() => {
          setNIntervalId(null);
          setByTheNumberIndex((old) => old + 1);
          setIntervalCount(0);
        }, 500);
      }
    }
  }, [byTheNumberIndex, intro.byTheNumber.metrics, intervalCount, nIntervalId]);

  const handleScroll = () => {
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

    const openingsTitleEle = openingsTitleRef.current;
    if (openingsTitleEle) {
      if (!openingsTitleEle.classList.value.includes(' reveal')) {
        const scrollOffsetTop = openingsTitleEle.getBoundingClientRect().top;
        if (scrollOffsetTop - window.innerHeight * 0.8 < 0) {
          openingsTitleEle.classList.add('reveal');
        }
      }
    }
  };

  const dispCountingNumber = (item, i) => {
    if (i > byTheNumberIndex) return '';

    if (i === byTheNumberIndex) {
      const stepCount = Math.floor(item.count / 3);
      let countingNum = 0;

      if (intervalCount <= item.count * 2) {
        countingNum = Math.floor(
          intervalCount / ((item.count * 2) / stepCount)
        );
      } else if (intervalCount <= item.count * 5) {
        countingNum =
          stepCount +
          Math.floor(
            (intervalCount - item.count * 2) / ((item.count * 3) / stepCount)
          );
      } else {
        countingNum =
          stepCount * 2 +
          Math.floor(
            (intervalCount - item.count * 5) /
              ((item.count * 5) / (item.count - stepCount * 2))
          );
      }

      return countingNum < 1 ? '' : countingNum;
    }

    return item.count;
  };

  return (
    <PageLayout className="relative">
      <div className={`hidden fixed top-2/4 left-10 md:flex flex-col z-10`}>
        {navMenuItems.map((item) => (
          <div className="uppercase" key={item.id}>
            <a
              className={`flex items-center ${
                currentNavMenuItem === 'jobs' ? 'text-black' : ''
              }`}
              href={item.link}
            >
              <div
                className={`w-1.5 h-1.5 rounded ${
                  currentNavMenuItem === item.id
                    ? currentNavMenuItem === 'jobs'
                      ? 'bg-black'
                      : 'bg-white'
                    : ''
                } mr-2`}
              ></div>
              {item.name}
            </a>
          </div>
        ))}
      </div>

      <section
        id={stringToSlug(intro.menuName)}
        data-section-index="0"
        data-animate-ref="section"
        className="relative flex"
        ref={navSectionRefs[0]}
        data-background="dark"
      >
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source src={AboutBannerVideo} type="video/mp4"></source>
        </video>

        <div className="relative w-full max-w-main mx-auto px-5 sm:px-12">
          <div className="relative max-w-[860px] flex flex-col items-between ml-auto">
            {intro.introText && (
              <div className="flex items-center">
                <p
                  className={`animate-reveal text-3xl leading-[40px] pt-24 ${
                    isPageEntered ? 'reveal' : ''
                  }`}
                >
                  {intro.introText}
                </p>
              </div>
            )}
            {intro.byTheNumber.metrics?.length && (
              <div className="h-[80vh]" ref={byTheNumberRef}>
                {intro.byTheNumber.heading && (
                  <p className="text-sm pt-[20vh] pb-5">
                    {intro.byTheNumber.heading}
                  </p>
                )}
                {intro.byTheNumber.metrics.map((item, i) => (
                  <p className="text-2xl leading-[30px]" key={i}>
                    {dispCountingNumber(item, i)}{' '}
                    <span
                      className={`${
                        i < byTheNumberIndex ? 'fade-in' : 'opacity-0'
                      }`}
                    >
                      {item.metric}
                    </span>
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        id={stringToSlug(ourTeam.menuName)}
        className="bg-dark_red py-48"
      >
        <div className="flex flex-col justify-end w-full max-w-main mx-auto px-5 sm:px-12 lg:flex-row">
          <div
            className="flex h-fit mb-4 lg:justify-end lg:mb-0"
            ref={navSectionRefs[1]}
            data-section-index="1"
            data-animate-ref="section"
            data-background="dark"
          >
            <p
              className="animate-reveal text-4xl leading-none tracking-[0.36px] lg:w-[200px] lg:text-[65px] lg:leading-[65px] lg:tracking-[0.65px] lg:mr-10"
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

            {ourTeam.featuredTeamMembers &&
              ourTeam.featuredTeamMembers.map((teamMember, i) => (
                <div
                  key={`featured-team-member-${i}`}
                  className={`flex flex-col mt-48${
                    i % 2 !== 0 ? ' ml-auto' : ''
                  }`}
                >
                  <TeamStudioFeatured data={{ ...teamMember }} />
                </div>
              ))}

            {ourTeam.teamMembers && (
              <div className="flex flex-wrap mt-48">
                {ourTeam.teamMembers.map((teamMember, i) => (
                  <div
                    data-animate-ref="team-member"
                    data-index={i}
                    key={`team-members-${i}`}
                    ref={teamMemberRefs[i]}
                  >
                    <TeamStudioItem
                      data={teamMember}
                      animate={teamMembersAnimate[i]}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        id={stringToSlug(studioOpenings.menuName)}
        className="bg-light_gray py-24"
        ref={navSectionRefs[2]}
        data-section-index="2"
        data-animate-ref="section"
        data-background="light"
      >
        <div className="flex justify-end w-full max-w-main mx-auto px-5 sm:px-12">
          <div className="w-full max-w-[860px] flex flex-col">
            <h2
              className="animate-reveal text-[65px] text-black leading-[65px] tracking-[0.65px]"
              ref={openingsTitleRef}
            >
              Studio Openings
            </h2>

            <div className="flex flex-col my-16 space-y-5">
              {jobListings.length ? (
                jobListings.map((pos, i) => (
                  <React.Fragment key={i}>
                    <OpeningJobItem data={pos} order={i} opened={i === 0} />
                  </React.Fragment>
                ))
              ) : (
                <div className="text-black">
                  {studioOpenings.jobsNoListings?.heading && (
                    <h3 className="text-2xl">
                      {studioOpenings.jobsNoListings.heading}
                    </h3>
                  )}
                  {studioOpenings.jobsNoListings?.textContent && (
                    <div>{studioOpenings.jobsNoListings.textContent}</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPageContent;
